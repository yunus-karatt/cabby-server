import { Server, Socket } from "socket.io";

export const socketIOServer = (server: any) => {
  const io: Server = new Server(server, {
    cors: {
      origin: "*",
      credentials: true,
    },
  });

  io.on("connect", (socket: Socket) => {
    console.log("connected", socket.id);

    socket.on("getNearByDrivers", (data) => {
      console.log(data);
      io.emit("getDriverCoordinates",{lat:data.source.lat,long:data.source.long,cabId:data.selectedCabId});
    });

    socket.on("driverDistance",(data:{distance:number,driverId:string})=>{
      console.log(data)
     })
  });
};
