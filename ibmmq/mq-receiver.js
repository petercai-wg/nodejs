const mq = require('ibmmq');
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

// Define the incoming message callback
function getCallback(err, hObj, gmo, md, buffer, hConn) {
    if (err) {
        if (err.mqrc === MQC.MQRC_NO_MSG_AVAILABLE) {
            console.log("No messages remaining.");
        } else {
            console.error("Get error:", err.mqrcstr);
        }
    } else {
        console.log("Received Message:", buffer.toString());
    }
}

// 4. Connect to the Queue Manager
mq.Connx(qMgr, cno, function (err, hConn) {
    if (err) {
        console.error("Connection failed: " + err.mqrcstr);
        return;
    }
    console.log("Successfully connected to Queue Manager: " + qMgr);

    // 5. Open the Queue for reading messages
    const od = new mq.MQOD();
    od.ObjectName = queueName;
    const openOptions = MQC.MQOO_INPUT_AS_Q_DEF | MQC.MQOO_FAIL_IF_QUIESCING; // Open for getting messages

    mq.Open(hConn, od, openOptions, function (err, hObj) {
        if (err) {
            console.error("Failed to open queue: " + err.mqrcstr);
            disconnect(hConn);
            return;
        }
        console.log("Successfully opened queue: " + queueName);


        const gmo = new mq.MQGMO();
        gmo.Options = MQC.MQGMO_WAIT | MQC.MQGMO_NO_SYNCPOINT;
        gmo.WaitInterval = 5000; // Wait 5 seconds for new messages



        // Register callback and activate the consumer thread
        mq.Get(hObj, new mq.MQMD(), gmo, getCallback);
        mq.Ctl(hConn, MQC.MQOP_START, function (err) {
            if (err) console.error("Control start failure:", err.mqrcstr);
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
