import { styled } from "@mui/styles";
import {
  Typography,
  Drawer,
  Box,
  Button,
  MenuItem,
  InputAdornment,
  InputLabel,
  TextField,
  Select,
  FormControl,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller } from "react-hook-form";
import { ICreateEntry } from "interfaces/interfaces";
import { addData } from "../GlobalRedux/ReduxState";
import { useDispatch, useSelector } from "react-redux";
//import { format } from "date-fns";

const CreateEntryDrawer = ({ open, setOpen, id }: any) => {
  const [searchText, setSearchText] = useState<string>("");
  const [onModal, setModal] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [classId, setClassId] = useState("");
  const [selectedOption, setSelectedOption] = useState<string>("");

  let dataCoutn = useSelector((state: any) => state.myData);
  console.log(dataCoutn.length, "shownum");

  const dispatch = useDispatch();

  let defaultValues = {
    id: 0,
    machine_types: [],
    machine_attributes: [],
    color: "",
    weight_value: "",
    power_value: 0,
    manufacturing_date: "",
  };

  const schema = Yup.object({
    power_value: Yup.number().required("Power Number is required"),
    color: Yup.string().required("color  is required"),
    weight_value: Yup.string().required("Weight Value is required"),
    // machine_types: Yup.object().required("Machine Type is required"),
    // machine_attributes: Yup.string().required("Machine Attribute is required"),
    // manufacturing_date: Yup.any().required("Machine Date is required"),
  });

  const resolver = yupResolver(schema);
  const { control, handleSubmit, watch, reset } = useForm({
    defaultValues,
    resolver,
  });
  let iD = watch("id");
  const machineType = watch("machine_types");
  const attributes = watch("machine_attributes");
  const color = watch("color");
  const weightValue = watch("weight_value");
  const powerValue = watch("power_value");
  const manufacturingDate = watch("manufacturing_date");

  console.log("attributes", attributes);

  const handleChange = (e: any) => {
    setSelectedOption(e.target.value);
  };

  const onSubmit = (data: ICreateEntry) => {
    console.log(data);

    const val = {
      id: dataCoutn.length + 1,
      machine_types: machineType,
      machine_attributes: attributes,
      color: color,
      weight_value: weightValue,
      power_value: powerValue,
      manufacturing_date: manufacturingDate,
    };
    console.log("data", val);
    dispatch(addData(val));
    // const res = {
    //   ...data,
    //   machine_types: data?.machine_types,
    //   machine_attributes: data?.machine_attributes,
    //   color: data?.color,
    //   weight_value: data?.weight_value,
    //   power_value: data?.power_value,
    //   manufacturing_date: data?.manufacturing_date,
    // };
  };

  const onOpenModal = () => {
    setModal(true);
  };

  const machineTypes = ["Bull dozers", "Cranes", "Chainsaws"];

  const machineAttributes = ["Weight", "Power", "Manufacturing Date"];

  return (
    <>
      <Drawer
        sx={{ maxWidth: "400px" }}
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box
          component="form"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            width: "400px",
            position: "relative",
            height: "100vh",
          }}
        >
          <Box
            sx={{
              //   width: "100%",
              position: "sticky",

              top: 0,
              zIndex: 2,
              padding: "20px 25px 0px",
              backgroundColor: "white",
            }}
          >
            <Box display="flex" justifyContent="space-between">
              <Title>Add New</Title>
              <CloseIcon
                sx={{ cursor: "pointer" }}
                onClick={() => setOpen(false)}
              />
            </Box>
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            sx={{
              padding: "0 25px 20px",
              flex: 1,
              height: "100%",
              //   width: "100%",
            }}
          >
            <Box sx={{ height: "100%" }}>
              <Box>
                <FormControl fullWidth>
                  <Controller
                    render={({
                      field: { ref, onChange, value },
                      fieldState: { error },
                      ...props
                    }) => (
                      <Autocomplete
                        onChange={(event, item) => {
                          onChange(item);
                        }}
                        getOptionLabel={(option: any) => option}
                        multiple
                        // options={Object.values(ROLES_OPTIONS)}
                        options={machineTypes}
                        value={value}
                        renderInput={({ ...params }) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            label="Machine Types"
                            inputRef={ref}
                            sx={{ mt: 2 }}
                            error={Boolean(error?.message)}
                            helperText={error?.message}
                          />
                        )}
                        {...props}
                      />
                    )}
                    name="machine_types"
                    control={control}
                  />
                </FormControl>

                <FormControl fullWidth>
                  <Controller
                    render={({
                      field: { ref, onChange, value },
                      fieldState: { error },
                      ...props
                    }) => (
                      <Autocomplete
                        onChange={(event, item) => {
                          onChange(item);
                        }}
                        getOptionLabel={(option: any) => option}
                        multiple
                        // options={Object.values(ROLES_OPTIONS)}
                        options={machineAttributes}
                        value={value}
                        renderInput={({ ...params }) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            label="Machine Attributes"
                            inputRef={ref}
                            sx={{ mt: 5 }}
                            error={Boolean(error?.message)}
                            helperText={error?.message}
                          />
                        )}
                        {...props}
                      />
                    )}
                    name="machine_attributes"
                    control={control}
                  />
                </FormControl>
                {attributes?.map(
                  (props: string) =>
                    props === "Weight" && (
                      <Controller
                        name="weight_value"
                        control={control}
                        rules={{ required: "Enter Weight Value" }}
                        render={({
                          field: { ref, ...fields },
                          fieldState: { error },
                        }) => (
                          <TextField
                            variant="outlined"
                            label="Weight Value"
                            fullWidth
                            {...fields}
                            inputRef={ref}
                            sx={{ mt: 5 }}
                            error={Boolean(error?.message)}
                            helperText={error?.message}
                          />
                        )}
                      />
                    )
                )}
                {attributes?.map(
                  (props: string) =>
                    props === "Power" && (
                      <Controller
                        name="power_value"
                        control={control}
                        rules={{ required: "Enter Power Value" }}
                        render={({
                          field: { ref, ...fields },
                          fieldState: { error },
                        }) => (
                          <TextField
                            variant="outlined"
                            label="Power Value"
                            fullWidth
                            {...fields}
                            inputRef={ref}
                            sx={{ mt: 5 }}
                            error={Boolean(error?.message)}
                            helperText={error?.message}
                          />
                        )}
                      />
                    )
                )}

                {attributes?.map(
                  (props: string) =>
                    props === "Manufacturing Date" && (
                      <Controller
                        name="manufacturing_date"
                        control={control}
                        render={({
                          field: { ref, ...fields },
                          fieldState: { error },
                        }) => (
                          <TextField
                            {...fields}
                            variant="outlined"
                            fullWidth
                            sx={{ mt: 5 }}
                            inputRef={ref}
                            label="Manufacturing Date"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            error={Boolean(error?.message)}
                            helperText={error?.message}
                            placeholder="Select date"
                          />
                        )}
                      />
                    )
                )}
                <Controller
                  name="color"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "Enter Machine color",
                    },
                  }}
                  render={({
                    field: { ref, ...fields },
                    fieldState: { error },
                  }) => (
                    <TextField
                      variant="outlined"
                      label="machine color"
                      fullWidth
                      {...fields}
                      inputRef={ref}
                      sx={{ mt: 5 }}
                      error={Boolean(error?.message)}
                      helperText={error?.message}
                    />
                  )}
                />
              </Box>
            </Box>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            px={4}
            sx={{
              textAlign: "right",
              py: 2,
              backgroundColor: (theme) => theme.palette.common.white,
              position: "sticky",
              bottom: 0,
              zIndex: 2,
            }}
          >
            <Button
              type="submit"
              variant="outlined"
              sx={{ width: "115px", mr: 2 }}
              color="primary"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              //   sx={{ width: "auto" }}
              variant="contained"
              color="primary"
            >
              Send
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default CreateEntryDrawer;

const Title = styled(Typography)({
  fontStyle: "normal",
  fontWeight: "500",
  fontSize: "18px",
  lineHeight: "150%",
  color: "#1E0A3C",
  paddingBottom: "20px",
});
