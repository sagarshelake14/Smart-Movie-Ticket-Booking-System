import React from "react";
import { Button, Form } from 'antd';

function Register(){
         return (
                  <div className="flex justify-center h-screen item-center bg-primary">
                           <div className="card p-3 w-400">
                                    <h1 className="text-xl">MOVIEMAGIC - REGISTER</h1>
                                    <hr/>
                                    <Form
                                    layout="vertical" 
                                    className="mt-1"
                                    >
                                             <Form.Item 
                                             label="Name"
                                             name="name"
                                             rules={[{required: true, message:'please input your name'}]}
                                             >
                                                      <input type="text"/>
                                             </Form.Item>

                                             <Form.Item 
                                             label="Email"
                                             name="email"
                                             rules={[{required: true, message:'please input your email'}]}
                                             >
                                                      <input type="email"/>
                                             </Form.Item>

                                             <Form.Item 
                                             label="Password"
                                             name="password"
                                             rules={[{required: true, message:'please input your password'}]}
                                             >
                                                      <input type="password"/>
                                             </Form.Item>
                                    </Form>
                           </div>
                  </div>
         )
}

export default Register 