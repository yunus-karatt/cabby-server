import { Server, Socket } from "socket.io"



export const socketIOServer=(server:any)=>{
  const io:Server=new Server(server,{
    cors:{
      origin:"*",
      credentials:true
    }
  })

  io.on("connect",(socket:Socket)=>{
    console.log("connected",socket.id)
  })
}