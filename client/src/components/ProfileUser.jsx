
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card"
import React from 'react'
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useState } from 'react'

const ProfileUser = () => {
    const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john@example.com");
  const [phone, setPhone] = useState("+1 (555) 555-5555");
  const [address, setAddress] = useState("123 Main St, Anytown USA");
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
                  { label: "Name", value: name, setter: setName },
                  { label: "Email", value: email, setter: setEmail },
                  { label: "Phone", value: phone, setter: setPhone },
                  { label: "Address", value: address, setter: setAddress },
                  { label: "Password", value: password, setter: setPassword, type: "password" },
                ].map(({ label, value, setter, type = "text" }) => (
                  <div className="grid grid-cols-[1fr_auto] items-center gap-2" key={label}>
                    <p className="text-sm font-medium">{label}</p>
                    <div className="flex items-center gap-2">
                      <Input
                        type={type}
                        value={value}
                        onChange={handleChange(setter)}
                        className="max-w-[200px]"
                        disabled={editField !== label}
                      />
                      {editField === label && (
                        <div className="flex items-center gap-2">
                          <Input
                            type="password"
                            value={currentPassword}
                            onChange={handleChange(setCurrentPassword)}
                            placeholder="Current Password"
                            className="max-w-[200px]"
                          />
                          <Button variant="" size="sm" onClick={()=>handleConfirmClick(label)} >Confirm Changes</Button>
                        </div>
                      )}
                      {editField!==label && (<Button variant="outline" size="sm" onClick = {()=>handleEditClick(label)} >Edit</Button>)}
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