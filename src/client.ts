/*
 *
 * Copyright 2015 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import { ServiceError } from "@grpc/grpc-js";
import { GreeterClient } from "./gen/helloworld_grpc_pb";
import { HelloReply, HelloRequest } from "./gen/helloworld_pb";

var parseArgs = require("minimist");

var grpc = require("@grpc/grpc-js");

function client() {
  var argv = parseArgs(process.argv.slice(2), {
    string: "target",
  });
  var target;
  if (argv.target) {
    target = argv.target;
  } else {
    target = "localhost:50051";
  }
  var client = new GreeterClient(target, grpc.credentials.createInsecure());
  var request = new HelloRequest();
  var user;
  if (argv._.length > 0) {
    user = argv._[0];
  } else {
    user = "world";
  }
  request.setName(user);
  client.sayHello(
    request,
    function (err: ServiceError | null, response: HelloReply) {
      if (err) {
        console.log("Error:", err);
        return;
      }
      console.log("Greeting:", response.getMessage());
    }
  );
}

client();
