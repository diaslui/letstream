const configs = {
  ws: undefined,
  streamerSocketId: "",
  watchersId: "",
};

const eRefs = {
  loader: ".loader",
  anyoneStreaming: ".anyone-streaming",
  anyoneStreamingStartBtn: ".anyone-streaming button",
  streamingDiv: ".streaming-div",
  videoDiv: "#stream-video-player",
};
const dRefs = {};

const loadTagsRefs = async () => {
  for (ref in eRefs) {
    dRefs[ref] = document.querySelector(eRefs[ref]);
    if (!dRefs[ref]) {
      console.error(`element "${ref}" not found. are this in document?`);
    }
  }

  return true;
};

const loader = (loading) => {
  if (loading) {
    dRefs.loader.style.display = "flex";
  } else {
    dRefs.loader.style.display = "none";
  }
};

const addListeners = async (defs = []) => {
  defs.map((d) => {
    console.log(d);
    d.element.addEventListener(d.event, d.listener);
  });
};

const startStreaming = async () => {
  const stream = await navigator.mediaDevices.getDisplayMedia({
    video: true,
    audio: true,
  });
  dRefs["videoDiv"].srcObject = stream;
  dRefs["videoDiv"].play();
};

const guiRefresh = () => {
  console.log(configs)
  if (configs.streamerSocketId == ""){
    dRefs.anyoneStreaming.style.display = "flex"
    dRefs.streamingDiv.style.display = "";

  }

}

const updateStreamingStatus = (content) => {
  configs.streamerSocketId = content["streamerSocketId"];
  configs.watchersId = content["watchersId"];
  guiRefresh();
};

const connectWs = () => {
  configs.ws = new WebSocket(window.location.href.replace("http", "ws"));
  configs.ws.onopen = (e) => {
    configs.ws.send(
      JSON.stringify({
        event: "get-stream-status",
      })
    );
  };

  configs.ws.onmessage = (e) => {
    const data = JSON.parse(e.data);
    console.log(data);
    switch (data.event) {
      case "get-stream-status":
        updateStreamingStatus(data.content);
        break;
    }
  };

  configs.ws.onclose = (e) => {
    console.log("WebSocket connection closed:", e);
  };

  configs.ws.onerror = (err) => {
    console.error("ws error:", err);
  };
};

const init = async () => {
  await loadTagsRefs();
  loader(true);
  console.log(dRefs);
  await addListeners([
    {
      element: dRefs["anyoneStreamingStartBtn"],
      event: "click",
      listener: startStreaming,
    },
  ]);
  connectWs();
  loader(false);
};

document.addEventListener("DOMContentLoaded", init);
