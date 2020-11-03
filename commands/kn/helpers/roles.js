const roles = {
  teamIds: ['771476559340240947', '771476707131523072'],
  captainIds: ['771487918954381322', '771488000210501662'],

  updateCache: (guild, callback) => {
    guild.members.fetch().then(callback());
  },

  getUsersWithRole: (guild, roleId) => {
    return guild.members.cache.filter((member) => {
      return member.roles.cache.find((role) => role.id == roleId);
    });
  },

  fetchUsersWithRole: (guild, roleId) => {
    guild.members
      .fetch()
      .then((members) =>
        callback(
          members.filter((member) =>
            member.roles.cache.find((role) => role.id == roleId)
          )
        )
      );
  },
};

module.exports = roles;
