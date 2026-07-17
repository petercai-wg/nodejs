const mq = require('ibmmq');
const fs = require('node:fs');

const msgxml = fs.readFileSync('./pacs.xml', 'utf8');
console.log(msgxml);


const MQC = mq.MQC; // Contains MQ configuration constants

// 1. Connection Configurations
const qMgr = "QM1"; // Your Queue Manager name
const queueName = "DEV.QUEUE.1"; // Target Queue name

// 2. Client Connection Details (For connecting to a remote server)
const cd = new mq.MQCD();
cd.ConnectionName = "localhost(1414)"; // Hostname and port
cd.ChannelName = "DEV.APP.SVRCONN";  // Client connection channel

// 3. Security Credentials (Optional, if required by your MQ server)
const csp = new mq.MQCSP();
csp.AuthenticationType = MQC.MQCSP_AUTH_USER_ID_AND_PWD;
csp.UserId = "app";
csp.Password = "apwd";

const cno = new mq.MQCNO();
cno.Options = MQC.MQCNO_CLIENT_BINDING; // Use client connection mode
cno.ClientConn = cd;
cno.SecurityParms = csp;

console.log("Connecting to IBM MQ...");



// 4. Connect to the Queue Manager
mq.Connx(qMgr, cno, function (err, hConn) {
    if (err) {
        console.error("Connection failed: " + err.mqrcstr);
        return;
    }
    console.log("Successfully connected to Queue Manager: " + qMgr);

    // 5. Open the Queue
    const od = new mq.MQOD();
    od.ObjectName = queueName;
    const openOptions = MQC.MQOO_OUTPUT; // Open for putting messages

    mq.Open(hConn, od, openOptions, function (err, hObj) {
        if (err) {
            console.error("Failed to open queue: " + err.mqrcstr);
            disconnect(hConn);
            return;
        }
        console.log("Successfully opened queue: " + queueName);

        // 6. Put a message into the Queue
        const mqmd = new mq.MQMD(); // Message descriptor
        const pmo = new mq.MQPMO();   // Put message options

        mq.Put(hObj, mqmd, pmo, msgxml, function (err) {
            if (err) {
                console.error("Failed to put message: " + err.mqrcstr);
            } else {
                console.log("Message successfully sent!");
            }

            // 7. Clean up and close connections
            mq.Close(hObj, 0, function (err) {
                if (err) console.error("Error closing queue: " + err.mqrcstr);
                disconnect(hConn);
            });
        });
    });
});

// Helper function to disconnect
function disconnect(hConn) {
    mq.Disc(hConn, function (err) {
        if (err) {
            console.error("Disconnect failed: " + err.mqrcstr);
        } else {
            console.log("Disconnected from Queue Manager.");
        }
    });
}
