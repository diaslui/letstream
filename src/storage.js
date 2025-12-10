const stream = {
  streamerSocketId: '',
  watchersId: [],
};

export const globalStream = {
  get: () => {
    return stream;
  },

  updateStreamer: (socketId) => {
    stream.streamerSocketId = socketId;
  },

  addWatcher: (socketId) => {
    stream.watchersId.push(socketId);
  },

  removeWatcher: (socketId) => {
    stream.watchersId = stream.watchersId.filter((i) => i !== socketId);
  },

  destroy: () => {
    stream = {
      streamerSocketId: undefined,
      watchersId: [],
    };
  },
};
