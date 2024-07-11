
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card"
import React from 'react'
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useState, useEffect } from 'react'
import { UseDispatch, useSelector } from "react-redux"



const ProfileUser = () => {

  const currentUser = useSelector((state) => state.user.currentUser);
  useEffect( () => {
    // Fetch user data
    // const user = await fetch(`${process.env.REACT_APP_BASE_URL}/api/user/${user._id}`,{
    //   method: "GET",



  }, []);
  const [name, setName] = useState(currentUser.firstname + " " + currentUser.lastname);
  const [email, setEmail] = useState(currentUser.email);
  const [program, setProgram] = useState(currentUser.program);
  const [yearOfGraduation, setYearOfGraduation] = useState(currentUser.yearOfGraduation)
  const [username, setUsername] = useState(currentUser.username)
  const [password, setPassword] = useState("********");
  const [editField, setEditField] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");

  const handleEditClick = (field) => {
    setEditField(field);
  };

  const handleConfirmClick = (field) => {
    setEditField(null);
    setCurrentPassword("");
  };

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
  };
  return (
    <main>
          <div className="container mx-auto grid gap-8 px-4 md:px-6 lg:px-8">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>View and manage your personal information.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                {[
                  { label: "Name", value: name, setter: setName, editable: true },
                  { label: "Username", value: username, setter: setUsername, editable: false },
                  { label: "Email", value: email, setter: setEmail, editable: false },
                  { label: "Program", value: program, setter: setProgram, editable: true },
                  { label: "Year Of Graduation", value: yearOfGraduation, setter: setYearOfGraduation, editable: true },
                  { label: "Password", value: password, setter: setPassword, type: "password", editable: true },
                ].map(({ label, value, setter, type = "text", editable }) => (
                  <div className="grid grid-cols-[1fr_auto] items-center gap-2" key={label}>
                    <p className="text-sm font-medium">{label}</p>
                    <div className="flex items-center gap-2">
                      {((editField === label) && editable) && (
                        <div className="flex items-center gap-2">
                          <Button variant="" size="sm" onClick={()=>handleConfirmClick(label)} >Confirm Changes</Button>
                          <Input
                            type="password"
                            value={currentPassword}
                            onChange={handleChange(setCurrentPassword)}
                            placeholder="Current Password"
                            className="max-w-[200px]"
                          />
                        </div>
                      )}
                      {((editField!==label) && editable) && (<Button variant="outline" size="sm" onClick = {()=>handleEditClick(label)} >Edit</Button>)}
                      <Input
                        type={type}
                        value={value}
                        onChange={handleChange(setter)}
                        className="max-w-[200px]"
                        disabled={editField !== label}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="destructive" className="ml-auto">Delete Account</Button>
              </CardFooter>
            </Card>
          </div>
        </main>
  )
}

export default ProfileUser