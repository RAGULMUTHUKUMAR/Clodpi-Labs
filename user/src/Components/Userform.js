import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { TbEdit } from "react-icons/tb";

const UserForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [data, setData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:4000/users");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const handleSubmit = async () => {
    const user = { name, email, age: parseInt(age) };
    try {
      if (isEditing) {
        await axios.put(`http://localhost:4000/users/${currentId}`, user);
      } else {
        await axios.post("http://localhost:4000/users", user);
      }
      fetchUsers();
      setName("");
      setEmail("");
      setAge("");
      setIsEditing(false);
      setCurrentId(null);
    } catch (error) {
      console.error("Error submitting user", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  const handleEdit = (user) => {
    setName(user.name);
    setEmail(user.email);
    setAge(user.age.toString());
    setIsEditing(true);
    setCurrentId(user.id);
  };

  return (
    <div className="w-full h-screen bg-white flex flex-col items-center">
      <h1 className="text-center text-[25px] font-bold text-[#24A19C] p-5">
        USER MANAGEMENT
      </h1>
      <div className="w-[800px] h-[300px] flex flex-col items-center justify-center mt-3 gap-5 shadow-[#b9b9b9] shadow-2xl bg-[#fffcee]">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          type="text"
          className="p-2 w-[400px] drop-shadow-md"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          className="p-2 w-[400px] drop-shadow-md"
        />
        <input
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Age"
          type="number"
          className="p-2 w-[400px] drop-shadow-md"
        />
        <button
          onClick={handleSubmit}
          className="cursor-pointer p-2 mt-2 rounded-[2px] w-[100px] bg-[#24A19C] text-white font-bold"
        >
          {isEditing ? "Update" : "Add User"}
        </button>
      </div>
      <h1 className="mt-[50px] text-[25px] font-bold text-[#24A19C] p-3">
        User List
      </h1>
      <div className="w-full flex flex-wrap items-center justify-center gap-5 ">
        {data.map((user) => (
          <div
            key={user.id}
            className="flex flex-col gap-3 items-start justify-center bg-[#fffcee] p-5 shadow-[#b9b9b9] shadow-2xl"
          >
            <h1 className="font-medium">
              <span className="text-[#24a19c] font-bold">Name : </span> {user.name}
            </h1>
            <p className="font-medium">
              <span className="text-[#24a19c] font-bold">Email : </span> {user.email}
            </p>
            <p className="font-medium">
              <span className="text-[#24a19c] font-bold">Age : </span> {user.age}
            </p>
            <div className="flex items-center justify-around gap-[50px] mt-[20px]">
              <button
                onClick={() => handleEdit(user)}
                className="bg-[#E9C46A] text-[#fffcee] p-1 w-[70px] rounded-[5px] font-bold flex items-center justify-center gap-1"
              >
                <TbEdit className="text-[#fffcee]" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                className="bg-[#ff4747] text-[#fffcee] p-1 w-[100px] rounded-[5px] font-bold flex items-center justify-center gap-1"
              >
                Delete
                <MdDelete className="text-[#fffcee]" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserForm;
