import React, { useState } from "react";
import { Box, Chip, IconButton, Menu, MenuItem, Button } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Table from "../components/Table";
import CreateEntryDrawer from "components/CreateEntryDrawer";
import { useDispatch, useSelector } from "react-redux";
import { removeData } from "../GlobalRedux/ReduxState";
const Inventory = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [activated, setActivate] = useState<boolean>(false);
  const [rowStatus, setRowStatus] = useState<string>("");
  const [recordId, setRecordId] = useState<string | null>(null);
  const [openDrawer, setOpenDrawer] = useState(false);

  const dispatch = useDispatch();
  const dataSelector = useSelector((state: any) => state.myData);
  console.log("jhsbdksshow", dataSelector);
  const open = Boolean(anchorEl);
  const columns = [
    {
      header: "Machine Types",
      key: "machine_types",
      sort: true,
    },
    {
      header: "Machine Attributes & Value",
      key: "machine_attributes",
    },

    {
      header: "Machine Color",
      key: "color",
      align: "left",
    },
    {
      header: "",
      key: "edit",
      align: "left",
    },
  ];

  const data = [
    {
      id: 1,
      machine_types: "12:02:2023",
      machine_attributes: "the particular",
      value: "value10kg",
      machine_color: "red",
    },
    {
      id: 2,
      machine_types: "12:02:2023",
      machine_attributes: "the particular",
      value: "value10kg",
      machine_color: "red",
    },
  ];

  const handleClose = (actionType: string) => {
    // if (actionType === "SUSPENDED" || actionType === "INACTIVE") {
    //   setActivate(true);
    // }
    setOpenDrawer(true);
    setAnchorEl(null);
  };

  const handleClick = (event: any, edit: string) => {
    event.stopPropagation();
    setRowStatus(edit);
    setAnchorEl(event.currentTarget);
  };

  const handleOpen = () => {
    setOpenDrawer(true);
  };

  function creatData({
    id,
    machine_types,
    machine_attributes,
    weight_value,
    color,
    power_value,
    manufacturing_date,
  }: any) {
    return {
      id,
      machine_types: machine_types || "--",
      machine_attributes: (
        <Box
          sx={{
            backgroundColor: "lavender",
            width: "fit-content",
            p: 0.4,
            borderRadius: 0.8,
          }}
        >
          {`${machine_attributes} ` || "--"} :{" "}
          {`${
            weight_value
              ? weight_value
              : power_value
              ? power_value
              : manufacturing_date
          }` || "--"}
        </Box>
      ),

      color: color || "--",

      edit: (
        <Box display="flex" justifyContent="flex-start">
          <IconButton
            onClick={(event) => {
              setRecordId(id);
              handleClick(event, id);
            }}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={() => handleClose("")}>
            <MenuItem onClick={() => handleClose("edit")}>Edit</MenuItem>
            <MenuItem
              // onClick={() => handleClose(`${rowStatus}`)}
              onClick={() => {
                dispatch(removeData(dataSelector));
              }}
            >
              Delete
              {/* {rowStatus === "ACTIVE" ? "Deactivate" : "Activate"} */}
            </MenuItem>
          </Menu>
        </Box>
      ),
    };
  }

  const list: any = dataSelector?.map(
    ({
      machine_types,
      machine_attributes,
      color,
      power_value,
      manufacturing_date,
      weight_value,
    }: any) =>
      creatData({
        machine_types,
        machine_attributes,
        color,
        power_value,
        manufacturing_date,
        weight_value,
      }) || []
  );

  return (
    <Box>
      <Box>
        <Box display="flex" justifyContent="flex-end" m={4}>
          <Button variant="contained" onClick={() => handleOpen()}>
            Add New
          </Button>
        </Box>
        <Table
          columns={columns}
          data={list}
          // onRowItemClick={(row) => GetContractRowData(row)}
          // onPageChange={handlePageChange}
          // onRowsPerPageChange={handleRowsPerPage}
          empty={{
            title: "No ledger details",
            description: "You currently do not have ledger details",
            //  onAddNewClick: () => setIsContractLedgerOpen(true),
          }}
        />
      </Box>
      {openDrawer && (
        <CreateEntryDrawer open={openDrawer} setOpen={setOpenDrawer} />
      )}
    </Box>
  );
};

export default Inventory;
