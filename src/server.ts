import { GreeterService } from "./gen/helloworld_grpc_pb";
import { HelloReply } from "./gen/helloworld_pb";

var grpc = require("@grpc/grpc-js");

/**
 * Implements the SayHello RPC method.
 */
function sayHello(call: any, callback: any) {
  var reply = new HelloReply();
  reply.setMessage("Hello " + call.request.getName());
  callback(null, reply);
}

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
  var server = new grpc.Server();
  server.addService(GreeterService, { sayHello: sayHello });
  server.bindAsync(
    "0.0.0.0:50051",
    grpc.ServerCredentials.createInsecure(),
    () => {
      server.start();
      console.log(`Server running at http://localhost:50051`);
    }
  );
}

main();
