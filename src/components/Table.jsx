import React, { useEffect } from "react";
import { StyledDataGrid, CustomPagination, changeTheme } from "./StyledTable";
import { getAPI, putAPI, SERVER_IP } from "./Adapters";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Table() {
    const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
    const [data, setData] = React.useState([]);
    const navigate = useNavigate();
    const tableTheme = changeTheme('dark');
    
    const fetchData = () => {
            getAPI("/getImage?numberSample=2")
            .then(
                response => setData(response.data.records)                
            )
            .catch(
                error => {
                    if (error === 'Unauthorized') {
                        navigate("/login");
                    }
                    else {
                        console.log("Error get data: ", error);
                    }
                }
            )
    }

    useEffect( fetchData, []);

    const columns = [
        {
            field: "image_path",
            headerName: 'Image',
            flex: 1,
            minWidth: 100,
            maxWidth: 300,
            align: "center",
            headerAlign: 'center',
            renderCell: (params) => <img height={"100%"} width={"100%"} src={`${SERVER_IP}/images/${params.value}`} />
        },
        {
            field: "text",
            headerName: "Text",
            flex: 1,
            minWidth: 200,
            maxWidth: 600,
            align: "center",
            headerAlign: 'center',
            editable: true
        }
    ]

    const onProcessRowUpdate = (newRow) => {
        data.filter((item) => {
            if (item.id == newRow.id) {
                item.text = newRow.text
            }
        })
        return newRow
    }

    const signOut = () => {
        Cookies.remove("access_token", {path: "/"})
        navigate("/login");
    }

    const submitData = () => {
        let submit_data = []
        console.log("row selection: ", rowSelectionModel);
        rowSelectionModel.forEach((selected_item) => {
            // console.log("select item: ", selected_item);
            const select_data = data.filter((item) => {
                return selected_item === item.id
                }
            )
            // console.log("data submit: ", JSON.stringify(select_data));
            // console.log("data submit type: ", typeof(select_data));
            submit_data = submit_data.concat(select_data)
        })
        putAPI("/updateAllText", {"update_records": submit_data})
        .then(
            response => {
                console.log("Successfully updated data");
            }
        )
        .catch(
            error => {
                console.log("Update data error: ", error);
            }
        )
    }

    return (
    <>
        <div>
            <button type = 'button' className="btn btn-success btn-lg" onClick= {signOut}>Sign Out</button>
            <button type = 'button' className="btn btn-success btn-lg" onClick= {fetchData}>Fetch Data</button>
            <h2>Table Page</h2>
            <StyledDataGrid 
            title="Data Table"
            rows={data}
            columns={columns}
            // selectableRows
            initialState={{
            pagination: {
                paginationModel: { page: 0, pageSize: 100 },
            },
            }}
            checkboxSelection
            onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
            }}
            rowSelectionModel={rowSelectionModel}
            pageSizeOptions={[5, 10, 50, 100]}
            processRowUpdate={onProcessRowUpdate}
            onProcessRowUpdateError={err => console.log("Process Row Update Error: ", err)}
            slots={{
                pagination: CustomPagination,
              }}
            theme={tableTheme}
            />
            <button type = 'button' className="btn btn-success btn-lg" onClick= {submitData}>Submit</button>
        </div>
    </>
    )
}