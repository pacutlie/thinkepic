"use client";

import { useState } from "react";
import ShowModalButton from "../../Buttons/ShowModalButton";
import Modal from "./Modal";
import { FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { POST } from "@/utils/Fetch";
import DynamicAlert from "@/utils/DynamicAlert";

const roles = ["ADMIN", "AUTHOR"];

export default function AddUserModal({ reloadTable }) {
  const [show, setShow] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorName, setErrorName] = useState({ error: false, message: "" });
  const [errorEmail, setErrorEmail] = useState({ error: false, message: "" });
  const [errorPassword, setErrorPassword] = useState({ error: false, message: "" });
  const [errorRole, setErrorRole] = useState({ error: false, message: "" });
  const [errorStatus, setErrorStatus] = useState({ error: false, message: "" });

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    status: "",
  });

  const handleClose = () => {
    setShow(false);
    clearErrors();
  };

  const handleShow = () => setShow(true);

  const checkInputs = () => {
    if (inputs.name === "") {
      setErrorName({ error: true, message: "Nama belum diisi" });
    }
    if (inputs.email === "") {
      setErrorEmail({ error: true, message: "Email belum diisi" });
    }
    if (inputs.password === "") {
      setErrorPassword({ error: true, message: "Password belum diisi" });
    }
    if (inputs.role === "") {
      setErrorRole({ error: true, message: "Role belum dipilih" });
    }
    if (inputs.status === "") {
      setErrorStatus({ error: true, message: "Status belum dipilih" });
    }

    if (inputs.name === "" || inputs.email === "" || inputs.password === "" || inputs.role === "" || inputs.status === "") {
      return false;
    }

    return true;
  };

  const clearErrors = () => {
    const cleared = { error: false, message: "" };
    setErrorName(cleared);
    setErrorEmail(cleared);
    setErrorPassword(cleared);
    setErrorRole(cleared);
    setErrorStatus(cleared);
    setInputs({
      name: "",
      email: "",
      password: "",
      role: "",
      status: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!checkInputs()) return;

    const response = await POST({
      endpoint: "/api/user/signup",
      body: {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
        role: inputs.role,
        status: inputs.status,
      },
    });

    if (response.success) {
      DynamicAlert(response.message, "successTime");
      handleClose();
      reloadTable();
    } else {
      DynamicAlert(response.message);
      console.error("Terjadi kesalahan:", response);
    }
  };

  return (
    <>
      <ShowModalButton
        props={{
          title: "Tambah User",
          icon: "bi bi-plus",
          target: "addUser",
        }}
        handleShow={handleShow}
      />
      <Modal
        props={{
          title: "Tambah User",
          size: "lg",
          show,
          handleClose,
          handleSubmit,
        }}
      >
        <div className="row px-4 g-5">
          <div className="col-12">
            <TextField id="standard-basic" label="Nama" name="name" variant="standard" fullWidth error={errorName.error} helperText={errorName.message} onChange={handleChange} />
          </div>
          <div className="col-12">
            <TextField id="standard-basic" label="Email" name="email" variant="standard" fullWidth error={errorEmail.error} helperText={errorEmail.message} onChange={handleChange} />
          </div>
          <div className="col-12">
            <FormControl variant="standard" fullWidth error={errorPassword.error}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText>{errorPassword.message}</FormHelperText>
            </FormControl>
          </div>
          <div className="col-6">
            <FormControl variant="standard" fullWidth error={errorRole.error}>
              <InputLabel id="role">Role</InputLabel>
              <Select labelId="role" id="role" value={inputs.role} label="Role" name="role" onChange={handleChange}>
                <MenuItem value="">
                  <em className="text-muted">--Tidak ada--</em>
                </MenuItem>
                {roles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errorRole.message}</FormHelperText>
            </FormControl>
          </div>
          <div className="col-6">
            <FormControl variant="standard" fullWidth error={errorStatus.error}>
              <InputLabel id="status">Status</InputLabel>
              <Select labelId="status" id="status" value={inputs.status} label="Status" name="status" onChange={handleChange}>
                <MenuItem value="">
                  <em className="text-muted">--Tidak ada--</em>
                </MenuItem>
                <MenuItem value="ACTIVE">ACTIVE</MenuItem>
                <MenuItem value="NONACTIVE">NONACTIVE</MenuItem>
              </Select>
              <FormHelperText>{errorStatus.message}</FormHelperText>
            </FormControl>
          </div>
        </div>
      </Modal>
    </>
  );
}
