import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  const getpasswords = async()=>{
    let req = await fetch("http://localhost:3000/")
    let password = await req.json()
    console.log(password)
    setpasswordArray(password);
   
    
  }

  useEffect(() => {
    getpasswords()
 

  }, []);

  const savePassword = async() => {
    console.log(form);

    await fetch("http://localhost:3000/",{method:"POST" ,
      headers: {"Content-Type":"application/json"}, body: JSON.stringify({id: form.id})})

    setpasswordArray([...passwordArray, {...form, id: uuidv4()}]);
    // localStorage.setItem("password", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]));
    await fetch("http://localhost:3000/",{method:"POST" ,
       headers: {"Content-Type":"application/json"}, body: JSON.stringify({...form,id: uuidv4()})})
    console.log(passwordArray);
  };

  
  const deletePassword = async(id) => {
    console.log("Deleting Password With id: " , id);
    setpasswordArray(passwordArray.filter(item=>item.id!==id));
    // localStorage.setItem("password", JSON.stringify(passwordArray.filter(item=>item.id!==id)));
    let res = await fetch("http://localhost:3000/",{method:"POST" ,
      headers: {"Content-Type":"application/json"}, body: JSON.stringify({id})})
//     console.log(passwordArray);
  };

  const editPassword = (id) => {
    console.log("Editing Password With id: ", id);
    
    const itemToEdit = passwordArray.find(i => i.id === id);  // Find the item to edit
    setform({ ...itemToEdit });  // Set the form state with the found item
  
    const updatedPasswordArray = passwordArray.filter(item => item.id !== id);  // Filter out the item being edited
    setpasswordArray(updatedPasswordArray); 
//     localStorage.setItem("password", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]));
//     console.log(passwordArray);
  };

  const changeHandle = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <div class="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div class="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
      </div>

      <div className="mycontainer py-2">
        <h1 className="text-2xl text text-center font-bold">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">OP/ &gt;</span>
        </h1>
        <p className="text-green-900 text-center text-lg">
          Your Own Password Manager
        </p>
        <div className="text-black flex flex-col p-2  gap-8 text-center items-center">
          <input
            value={form.site}
            onChange={changeHandle}
            placeholder="Enter website URL"
            className="rounded-full h-8 border-2 border-green-500 w-full py-1"
            type="text"
            name="site"
            id=""
          />
          <div className="flex w-full  gap-8  justify-between">
            <input
              value={form.username}
              onChange={changeHandle}
              placeholder="Enter username"
              className="rounded-full border-2 h-8 border-green-500 w-full py-1"
              type="text"
              name="username"
              id=""
            />
            <div className="relative">
              <input
                value={form.password}
                onChange={changeHandle}
                placeholder="Enter password"
                className="rounded-full border-2 h-8 border-green-500 w-full py-1"
                type="text"
                name="password"
                id=""
              />
              <span className="absolute right-0">show</span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className=" hover:bg-green-300 flex justify-center items-centre text-black bg-green-400 rounded-full
           py-2 px-2 w-fit"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save Password
          </button>
        </div>
        <div className="passwords">
          <h2 className="py-2 font-bold text-2xl">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No Passwords To Show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md  overflow-hidden py-2">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th py-2>Site</th>
                  <th py-2>Username</th>
                  <th py-2>Password</th>
                  <th py-2>Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="  py-2 text-center w-32">
                        <div className="flex justify-center items-center">
                          <a href={item.site} target="blank">
                            {item.site}
                          </a>
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/depeqmsz.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className=" py-2 text-center w-32">
                        <div className="flex justify-center items-center">
                          <span>{item.username}</span>
                        </div>
                      </td>
                      <td className=" py-2 text-center w-32">
                        <div className="flex justify-center items-center">
                          <span>{item.password}</span>
                        </div>
                      </td>
                      <td className="  py-2 text-center w-32">
                        <div className="flex justify-center items-center">
                          <span className="" onClick={()=>{deletePassword(item.id)}}>
                            <lord-icon
                              src="https://cdn.lordicon.com/skkahier.json"
                              trigger="hover"
                              style={{ width: "25px", height: "25px" }}
                            ></lord-icon>
                          </span>
                          <span className="" onClick={()=>{editPassword(item.id)}}>
                            <lord-icon
                              src="https://cdn.lordicon.com/wkvacbiw.json"
                              trigger="hover"
                              style={{ width: "25px", height: "25px" }}
                            ></lord-icon>
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
