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
  const ws = new WebSocket(window.location.href.replace("http", "ws"))
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

  loader(false);
};

document.addEventListener("DOMContentLoaded", init);
