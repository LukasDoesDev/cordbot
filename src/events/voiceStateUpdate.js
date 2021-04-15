module.exports = {
  name: 'voiceStateUpdate',
  execute(client, oldState, newState) {
    var left = !!oldState.channelID && !newState.channelID;
    var joined = !oldState.channelID && !!newState.channelID;
    var switched =
      !!oldState.channelID &&
      !!newState.channelID &&
      newState.sessionID === oldState.sessionID &&
      newState.channelID !== oldState.channelID;

    if (oldState.channelID === newState.channelID) return;
    var newMember = newState.member;
    var oldMember = oldState.member;
    var newChannel = newState.channel;
    var oldChannel = oldState.channel;
    if (left) {
      console.log(`${oldMember.displayName} left ${oldChannel.name}`);
    } else if (joined) {
      console.log(`${newMember.displayName} joined ${newChannel.name}`);
    } else if (switched) {
      console.log(
        `${newMember.displayName} switched from ${oldChannel.name} to ${newChannel.name}`
      );
    } else {
      console.error('AN ERROR HAPPENED');
      oldState.guild = null;
      newState.guild = null;
      console.log(oldState, newState);
    }
  },
};
