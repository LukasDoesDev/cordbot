const utils = require('../../utils');

module.exports = {
  name: 'purge',
  use: 'purge [amount]',
  args: true,
  permissions: 'MANAGE_MESSAGES',
  description: 'Purges [amount] of messages. [amount] has to be less than 100',
  execute(msg, args) {
    async function purge() {
      msg.delete();
      var input = args[1];

      if (isNaN(input)) return utils.sec5msg(msg.channel, 'Send a number.');
      if (input > 100)
        return utils.sec5msg(
          msg.channel,
          'Send a number equal to or less than 100'
        );
      if (input < 0)
        return utils.sec5msg(msg.channel, 'No negative numbers, duh 🤯');
      if (input == 0)
        return utils.sec5msg(
          msg.channel,
          "You can't delete 0 messages, duh 🤯"
        );

      var num = Number(input);

      if (num == 1) {
        /*msg.channel
          .messages.fetch({ limit: 1 })
          .then(msgs => msgs.first().delete())
          .catch(console.error);*/
        msg.channel
          .bulkDelete(1)
          .then(() => utils.sec5msg(msg.channel, `Purged ${num} messages!`))
          .catch((err) => {
            console.error(err);
            msg.channel.send('Error! Please contact Lukas.');
          });
        return;
      }

      // Deleting the messages
      msg.channel
        .bulkDelete(num)
        .then(() => {
          utils.sec5msg(msg.channel, `Purged ${num} messages!`);
        })
        .catch((err) => {
          console.error(err);
          msg.channel.send('Error! Please contact Lukas.');
        });
    }
    purge();
  },
};
