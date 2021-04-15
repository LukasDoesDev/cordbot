module.exports.sec5msg = (channel, data) => {
  channel
    .send(
      `${data}
This message will automatically get deleted after 5 seconds`
    )
    .then((newmsg) => {
      setTimeout(() => {
        newmsg.delete();
      }, 5000);
    });
};

module.exports.setPresence = (client) => {
  const statusConfig = require('../config/status.json');

  client.user.setPresence({
    activity: {
      name: statusConfig.activity.text,
      type: statusConfig.activity.type
    },
    afk: statusConfig.activity.afk,
    status: statusConfig.status
  })
}
module.exports.average = (arr) => arr.reduce((a, b) => a + b) / arr.length