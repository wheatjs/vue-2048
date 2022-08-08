import { ViteSSG } from "vite-ssg/single-page";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";
import { defineStore, createPinia } from "pinia";
import { defineComponent, computed, mergeProps, unref, useSSRContext, resolveDirective, withCtx, createTextVNode, toDisplayString, ref, watch, readonly, createVNode, openBlock, createBlock } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderSlot, ssrRenderStyle, ssrRenderList, ssrGetDirectiveProps, ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { createEventHook, until, useLocalStorage, useTransition, useClipboard, useSwipe, SwipeDirection, onKeyStroke } from "@vueuse/core";
import Peer from "peerjs";
import confetti from "canvas-confetti";
import { useHead } from "@vueuse/head";
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "Tile",
  __ssrInlineRender: true,
  props: {
    value: null
  },
  setup(__props) {
    const props = __props;
    const color = computed(() => {
      if (!props.value)
        return ["transparent", "transparent"];
      const colors = {
        2: ["#f16528", "white"],
        4: ["#edd51e", "black"],
        8: ["#3592cb", "white"],
        16: ["#f23901", "white"],
        32: ["#61dafb", "#13252a"],
        64: ["#4f82bf", "white"],
        128: ["#ff4556", "white"],
        256: ["#0963a3", "white"],
        512: ["rgb(255 208 40)", "#261f08"],
        1024: ["rgb(99 108 255)", "#fff"],
        2048: ["#40b883", "#34495e"],
        4096: ["#cb3837", "white"],
        8192: ["#509640", "white"],
        16384: ["#2f71ba", "white"],
        32768: ["white", "black"],
        65536: ["black", "white"]
      };
      if (props.value in colors)
        return colors[props.value];
      return ["transparent", "transparent"];
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "text-dark-50": "",
        rounded: "",
        flex: "",
        "place-items-center": "",
        "place-content-center": "",
        "font-mono": "",
        "lt-md:text-3xl": "",
        "text-5xl": "",
        "font-black": "",
        relative: "",
        "overflow-hidden": "",
        style: {
          "background-color": unref(color)[0],
          "color": unref(color)[1],
          "box-shadow": __props.value && __props.value >= 64 ? `0 0 10px 0px ${unref(color)[0]}` : "none"
        }
      }, _attrs))}><div absolute inset-0 class="${ssrRenderClass({
        "border-b-4 border-black border-opacity-10 border-r-4 border-r-white": __props.value
      })}"></div>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/Tile.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "Board",
  __ssrInlineRender: true,
  props: {
    board: null,
    score: null
  },
  setup(__props) {
    const props = __props;
    const items = computed(() => {
      return props.board.flat();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Tile = _sfc_main$c;
      const _directive_auto_animate = resolveDirective("auto-animate");
      _push(`<div${ssrRenderAttrs(mergeProps({
        "bg-secondary": "",
        "aspect-ratio-1": "",
        "rounded-lg": "",
        "p-4": "",
        relative: ""
      }, _attrs))}>`);
      if (_ctx.$slots.default) {
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      } else {
        _push(`<!--[--><div style="${ssrRenderStyle({
          gridTemplateColumns: `repeat(${props.board[0].length}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${props.board.length}, minmax(0, 1fr))`
        })}" top-0 left-0 absolute grid gap="lg:4 2" w-full h-full p-4><!--[-->`);
        ssrRenderList(unref(items).length, (i) => {
          _push(`<div bg-primary rounded h-full></div>`);
        });
        _push(`<!--]--></div><div${ssrRenderAttrs(mergeProps({
          grid: "",
          style: {
            gridTemplateColumns: `repeat(${props.board[0].length}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${props.board.length}, minmax(0, 1fr))`
          },
          gap: "lg:4 2",
          relative: "",
          "h-full": ""
        }, ssrGetDirectiveProps(_ctx, _directive_auto_animate, { duration: 100 })))}><!--[-->`);
        ssrRenderList(unref(items), (item, index) => {
          _push(ssrRenderComponent(_component_Tile, {
            key: item ? item[1] : `null-${index}`,
            class: { "not-empty": item, "empty": !item },
            value: item ? item[0] : null,
            "h-full": ""
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(item ? `${item[0]}` : "")}`);
              } else {
                return [
                  createTextVNode(toDisplayString(item ? `${item[0]}` : ""), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div><!--]-->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/Board.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "Button",
  __ssrInlineRender: true,
  props: {
    primary: { type: Boolean }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        "h-10": "",
        "border-1": "",
        "border-border": "",
        "bg-secondary": "",
        "rounded-full": "",
        "font-bold": "",
        "text-lg": "",
        "px-4": "",
        class: {
          "!bg-accent-500 !border-accent-300 text-dark-900/70": __props.primary
        }
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</button>`);
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/Button.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$9 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    class: "animate-spin -ml-1 mr-3 h-12 w-12 dark:text-white",
    fill: "none",
    viewBox: "0 0 24 24"
  }, _attrs))}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>`);
}
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/Spinner.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const Spinner = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["ssrRender", _sfc_ssrRender$1]]);
function rotateMatrix(matrix, rotations) {
  const rotate = () => {
    const N = matrix.length;
    for (let i = 0; i < N / 2; i++) {
      for (let j = i; j < N - i - 1; j++) {
        const temp = matrix[i][j];
        matrix[i][j] = matrix[N - 1 - j][i];
        matrix[N - 1 - j][i] = matrix[N - 1 - i][N - 1 - j];
        matrix[N - 1 - i][N - 1 - j] = matrix[j][N - 1 - i];
        matrix[j][N - 1 - i] = temp;
      }
    }
  };
  for (let i = 0; i < rotations; i++)
    rotate();
  return matrix;
}
function createRandom(seed) {
  seed = Math.floor(seed * (1e4 - 0 + 1)) + 0;
  return function(min, max) {
    let t = seed += 1831565813;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    const result = ((t ^ t >>> 14) >>> 0) / 4294967296;
    if (typeof min !== "undefined" && typeof max !== "undefined")
      return Math.floor(result * (max - min + 1)) + min;
    return result;
  };
}
function isArrayEqual(array1, array2) {
  if (!Array.isArray(array1) || !Array.isArray(array2))
    return array1 === array2;
  if (array1.length !== array2.length)
    return false;
  for (let i = 0, len = array1.length; i < len; i++) {
    if (!isArrayEqual(array1[i], array2[i]))
      return false;
  }
  return true;
}
function deepClone(arr) {
  const len = arr.length;
  const newArr = new Array(len);
  for (let i = 0; i < len; i++) {
    if (Array.isArray(arr[i]))
      newArr[i] = deepClone(arr[i]);
    else
      newArr[i] = arr[i];
  }
  return newArr;
}
let id = 0;
const createId = () => id += 1;
const directionToRotation = (direction) => {
  switch (direction) {
    case "up":
      return 0;
    case "down":
      return 2;
    case "left":
      return 1;
    case "right":
      return 3;
  }
};
function use2048() {
  const seed = ref(Math.random());
  const onMoveHook = createEventHook();
  const onDidWinHook = createEventHook();
  let rand = createRandom(seed.value);
  const winningScore = 32;
  const score = ref(0);
  const rows = ref(4);
  const columns = ref(4);
  const board = ref(Array.from({ length: rows.value }).map(() => Array.from({ length: columns.value }).map(() => null)));
  const hasWon = ref(false);
  const isGameOver = ref(false);
  watch(hasWon, () => {
    if (hasWon.value === true)
      onDidWinHook.trigger();
  });
  const checkIsGameOver = (board2) => {
    for (let i = 0; i < board2.length; i++) {
      for (let x = 0; x < board2[i].length; x++) {
        if (board2[i][x] === null)
          return false;
      }
    }
    for (let i = 0; i < board2.length; i++) {
      for (let x = 0; x < board2[i].length; x++) {
        if (i + 1 < board2.length) {
          const current = board2[i][x];
          const next = board2[i + 1][x];
          if (current[0] === next[0])
            return false;
        }
        if (x + 1 < board2[i].length) {
          const current = board2[i][x];
          const next = board2[i][x + 1];
          if (current[0] === next[0])
            return false;
        }
      }
    }
    return true;
  };
  const setRandomTile = (_board) => {
    const value = rand() < 0.9 ? 2 : 4;
    const row = rand(0, rows.value - 1);
    const column = rand(0, columns.value - 1);
    if (_board[row][column] !== null)
      setRandomTile(_board);
    else
      _board[row][column] = [value, createId()];
    if (checkIsGameOver(_board)) {
      isGameOver.value = true;
      return _board;
    }
    return _board;
  };
  const init = (_seed) => {
    score.value = 0;
    isGameOver.value = false;
    hasWon.value = false;
    if (_seed) {
      seed.value = _seed;
      rand = createRandom(_seed);
    }
    let _board = Array.from({ length: rows.value }).map(() => Array.from({ length: columns.value }).map(() => null));
    _board = setRandomTile(_board);
    _board = setRandomTile(_board);
    board.value = _board;
  };
  const move = async (direction) => {
    let _board = deepClone(board.value);
    const [startRow, endRow, rowStep, startRowMove, endRowMove, rowStepMove] = direction === "down" ? [rows.value - 1, -1, -1, 0, rows.value, 1] : [0, rows.value, 1, 0, rows.value, 1];
    const [startColumn, endColumn, columnStep] = direction === "right" ? [columns.value - 1, -1, -1] : [0, columns.value, 1];
    const rotations = directionToRotation(direction);
    _board = rotateMatrix(_board, rotations);
    const merges = [];
    for (let row = startRow; row !== endRow; row += rowStep) {
      for (let col = startColumn; col !== endColumn; col += columnStep) {
        const merge = (i) => {
          if (row - i < 0)
            return;
          const current = _board[row][col];
          const next = _board[row - i][col];
          if (current && next && current[0] === next[0] && !merges.includes(_board[row - i][col][1])) {
            _board[row - i][col] = [_board[row][col][0] * 2, _board[row][col][1]];
            score.value += _board[row - i][col][0];
            _board[row][col] = null;
            merges.push(_board[row - i][col][1]);
            if (_board[row - i][col][0] === winningScore && !hasWon.value)
              hasWon.value = true;
            return;
          } else if (_board[row - i][col] !== null) {
            return;
          }
          merge(i + 1);
        };
        merge(1);
      }
    }
    for (let row = startRowMove; row !== endRowMove; row += rowStepMove) {
      for (let col = startColumn; col !== endColumn; col += columnStep) {
        for (let i = row; i > 0; i--) {
          if (_board[i - 1][col] === null) {
            _board[i - 1][col] = _board[i][col];
            _board[i][col] = null;
          }
        }
      }
    }
    _board = rotateMatrix(_board, _board.length - rotations);
    if (!isArrayEqual(_board, board.value))
      _board = setRandomTile(_board);
    board.value = _board;
    onMoveHook.trigger(direction);
  };
  const largestTile = computed(() => Math.max(...board.value.map((x) => x.map((y) => y ? y[0] : 0)).flat()));
  const up = () => move("up");
  const down = () => move("down");
  const left = () => move("left");
  const right = () => move("right");
  return {
    board,
    score,
    init,
    up,
    down,
    left,
    right,
    move,
    seed,
    isGameOver,
    hasWon,
    largestTile,
    onWon: onDidWinHook.on,
    onMove: onMoveHook.on
  };
}
const usePeerStore = defineStore("peer", () => {
  const id2 = ref();
  const isOpen = ref(false);
  const isConnected = ref(false);
  const onConnectedHook = createEventHook();
  const onDisconnectedHook = createEventHook();
  const onErrorHook = createEventHook();
  const onMessageHook = createEventHook();
  let from;
  let to;
  let peer;
  const onOpen = () => {
    isConnected.value = true;
    onConnectedHook.trigger();
  };
  const onClose = () => {
    isConnected.value = false;
    onDisconnectedHook.trigger();
  };
  const onError = (e) => {
    onErrorHook.trigger(e);
  };
  const onData = (data) => {
    onMessageHook.trigger(data);
  };
  const createPeer = (_id) => {
    if (_id)
      peer = new Peer(_id, { debug: 2 });
    else
      peer = new Peer({ debug: 2 });
    peer.on("open", () => {
      isOpen.value = true;
      if (peer)
        id2.value = peer.id;
    });
    peer.on("close", () => {
      isOpen.value = false;
    });
    peer.on("connection", (conn) => {
      to = conn;
      to.on("open", onOpen);
      to.on("close", onClose);
      to.on("error", onError);
      to.on("data", onData);
    });
    peer.on("disconnected", () => {
      onDisconnectedHook.trigger();
    });
    peer.on("error", (e) => {
      onErrorHook.trigger(e);
    });
  };
  const destroyPeer = () => {
    if (peer)
      peer.destroy();
    peer = void 0;
  };
  const connect = async (id22) => {
    await until(isOpen).toBeTruthy();
    if (peer)
      from = peer.connect(id22);
    from.on("open", onOpen);
    from.on("close", onClose);
    from.on("error", onError);
    from.on("data", onData);
  };
  const disconnect = async () => {
    if (peer)
      peer.disconnect();
  };
  const sendMessage = (message, payload) => {
    if (to)
      to.send({ message, payload });
    else if (from)
      from.send({ message, payload });
  };
  const onMessage = (message, cb) => {
    onMessageHook.on((msg) => {
      if (msg.message === message)
        cb(msg.payload);
    });
  };
  return {
    id: id2,
    isOpen,
    isConnected,
    createPeer,
    destroyPeer,
    connect,
    disconnect,
    sendMessage,
    onConnected: onConnectedHook.on,
    onDisconnected: onDisconnectedHook.on,
    onError: onErrorHook.on,
    onMessage
  };
});
const useGameStore = defineStore("game", () => {
  const highScore = useLocalStorage("highScore", 0);
  const peer = usePeerStore();
  const localGame = use2048();
  const remoteGame = use2048();
  const onRemotePlayerJoined = createEventHook();
  const onRemotePlayerLeft = createEventHook();
  const isMultiplayerGameOpen = ref(false);
  const isRemotePlayerConnected = ref(false);
  const openMultiplayerGame = () => {
    peer.createPeer();
    isMultiplayerGameOpen.value = true;
  };
  const closeMultiplayerGame = () => {
    peer.destroyPeer();
    isMultiplayerGameOpen.value = false;
    const parmas = new URLSearchParams(window.location.search);
    parmas.delete("game");
    window.history.pushState({}, "", window.location.pathname);
    remoteGame.init(Math.random());
  };
  const joinMultiplayerGame = (id2) => {
    openMultiplayerGame();
    peer.connect(id2);
  };
  const leaveMultiplayerGame = () => {
    peer.disconnect();
    closeMultiplayerGame();
  };
  const startNewGame = (silent = false) => {
    const seed = Math.random();
    localGame.init(seed);
    if (isRemotePlayerConnected.value)
      peer.sendMessage("new-game", { seed, silent });
  };
  peer.onConnected(() => {
    isRemotePlayerConnected.value = true;
    startNewGame();
  });
  peer.onDisconnected(() => {
    isRemotePlayerConnected.value = false;
  });
  localGame.onMove((direction) => peer.sendMessage("move", { direction }));
  peer.onMessage("new-game", ({ seed, silent }) => {
    remoteGame.init(seed);
    if (!silent)
      startNewGame(true);
  });
  peer.onMessage("move", ({ direction }) => remoteGame.move(direction));
  watch(localGame.score, () => {
    if (localGame.score.value > highScore.value)
      highScore.value = localGame.score.value;
  });
  const isWaitingForOtherPlayer = computed(() => isMultiplayerGameOpen.value && !isRemotePlayerConnected.value);
  startNewGame();
  return {
    openMultiplayerGame,
    closeMultiplayerGame,
    localGame,
    remoteGame,
    highScore,
    startNewGame,
    isMultiplayerGameOpen: readonly(isMultiplayerGameOpen),
    isRemotePlayerConnected: readonly(isRemotePlayerConnected),
    isWaitingForOtherPlayer: readonly(isWaitingForOtherPlayer),
    joinMultiplayerGame,
    leaveMultiplayerGame,
    link: computed(() => `${window.location.origin}?game=${peer.id}`),
    onRemotePlayerJoined: onRemotePlayerJoined.on,
    onRemotePlayerLeft: onRemotePlayerLeft.on
  };
});
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "RemoateGameStatus",
  __ssrInlineRender: true,
  setup(__props) {
    const game = useGameStore();
    const score = useTransition(computed(() => game.remoteGame.score), {
      duration: 100
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        flex: "",
        "max-w": "600px",
        "w-full": "",
        "mx-auto": ""
      }, _attrs))}><span flex-1></span><div text-left><div text-8xl font-black font-mono text-light-800 leading-18 text-right>${ssrInterpolate(unref(score).toFixed(0))}</div><div text-3xl font-mono op50 text-right> Score </div><div op50 text-right> Join the tiles, get to 2048! </div></div></div>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/RemoateGameStatus.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
function useFireworks(options = {}) {
  const {
    duration = 8 * 1e3,
    startVelocity = 30,
    spread = 360,
    ticks = 60,
    zIndex = 100
  } = options;
  const play = () => {
    const animationEnd = Date.now() + duration;
    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0)
        return clearInterval(interval);
      const particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, { startVelocity, spread, ticks, zIndex }, { particleCount, origin: { x: 0.3, y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, { startVelocity, spread, ticks, zIndex }, { particleCount, origin: { x: 0.7, y: Math.random() - 0.2 } }));
    }, 250);
  };
  return {
    play
  };
}
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "CopyLink",
  __ssrInlineRender: true,
  setup(__props) {
    useClipboard();
    const didCopy = ref(false);
    useGameStore();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><button flex flex-row place-items-center place-content-center w-7 h-7 rounded><i class="${ssrRenderClass({ "i-carbon-copy": !didCopy.value, "i-carbon-checkmark text-green-500": didCopy.value })}"></i></button></div>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/CopyLink.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "Scrim",
  __ssrInlineRender: true,
  props: {
    hide: { type: Boolean }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        absolute: "",
        "inset-0": "",
        "bg-black": "",
        "z-5": "",
        "rounded-md": "",
        "bg-opacity-50": "",
        "backdrop-blur-sm": "",
        grid: "",
        "place-content-center": "",
        "place-items-center": "",
        "gap-4": "",
        "transition-opacity": "",
        "opacity-0": "",
        "pointer-events-none": "",
        class: {
          "!pointer-events-auto !opacity-100": !__props.hide
        }
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/Scrim.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "RemoteGame",
  __ssrInlineRender: true,
  setup(__props) {
    const { play } = useFireworks();
    const input = ref();
    const game = useGameStore();
    const showWonState = ref(false);
    game.localGame.onWon(() => {
      play();
      showWonState.value = true;
    });
    const selectText = () => {
      setTimeout(() => {
        if (input.value)
          input.value.select();
      }, 10);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_RemoateGameStatus = _sfc_main$8;
      const _component_Spinner = Spinner;
      const _component_Button = _sfc_main$a;
      const _component_Board = _sfc_main$b;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_RemoateGameStatus, {
        "mb-2": "",
        op50: "",
        "filter-grayscale-100": ""
      }, null, _parent));
      _push(`<div relative>`);
      _push(ssrRenderComponent(_sfc_main$6, {
        hide: !unref(game).isWaitingForOtherPlayer
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div flex flex-row items-center${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Spinner, {
              "w-6": "",
              "h-6": ""
            }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}> Waiting for other player to connect... </span></div><div flex flex-row items-center bg-dark-500 border="1 dark-50" rounded h-8${_scopeId}><input border="r-1 dark-100" h-full type="text" bg-transparent${ssrRenderAttr("value", unref(game).link)} px-2 text-sm outline="focus:none"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$7, null, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Button, {
              onClick: ($event) => unref(game).closeMultiplayerGame()
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Cancel `);
                } else {
                  return [
                    createTextVNode(" Cancel ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", {
                flex: "",
                "flex-row": "",
                "items-center": ""
              }, [
                createVNode(_component_Spinner, {
                  "w-6": "",
                  "h-6": ""
                }),
                createVNode("span", null, " Waiting for other player to connect... ")
              ]),
              createVNode("div", {
                flex: "",
                "flex-row": "",
                "items-center": "",
                "bg-dark-500": "",
                border: "1 dark-50",
                rounded: "",
                "h-8": ""
              }, [
                createVNode("input", {
                  ref_key: "input",
                  ref: input,
                  border: "r-1 dark-100",
                  "h-full": "",
                  type: "text",
                  "bg-transparent": "",
                  value: unref(game).link,
                  "px-2": "",
                  "text-sm": "",
                  outline: "focus:none",
                  onClick: selectText,
                  onFocus: selectText
                }, null, 40, ["value"]),
                createVNode(_sfc_main$7)
              ]),
              createVNode("div", null, [
                createVNode(_component_Button, {
                  onClick: ($event) => unref(game).closeMultiplayerGame()
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Cancel ")
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Board, {
        board: unref(game).remoteGame.board,
        score: unref(game).remoteGame.score,
        op50: "",
        "filter-grayscale-100": ""
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/RemoteGame.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "GameControls",
  __ssrInlineRender: true,
  setup(__props) {
    const game = useGameStore();
    const score = useTransition(computed(() => game.localGame.score), {
      duration: 100
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Button = _sfc_main$a;
      _push(`<div${ssrRenderAttrs(mergeProps({
        flex: "",
        "max-w": "600px",
        "w-full": "",
        "mx-auto": ""
      }, _attrs))}><div text-left self-end><div lt-md:text-7xl text-8xl font-black font-mono text-light-800 leading-18>${ssrInterpolate(unref(score).toFixed(0))}</div><div text-3xl font-mono op50> Score </div><div op50> Join the tiles, get to 2048! </div></div><span flex-1></span><div flex flex-col><div text-right op50 font-medium font-mono text-xl><div text-3xl>${ssrInterpolate(unref(game).highScore)}</div><div text-base op70> High Score </div></div><span flex-1></span><div flex flex-row lt-md:flex-col lt-md:pt-2 gap-2>`);
      _push(ssrRenderComponent(_component_Button, {
        onClick: ($event) => unref(game).isMultiplayerGameOpen ? unref(game).closeMultiplayerGame() : unref(game).openMultiplayerGame()
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(game).isMultiplayerGameOpen ? "Leave" : "Multiplayer")}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(game).isMultiplayerGameOpen ? "Leave" : "Multiplayer"), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Button, {
        primary: "",
        onClick: ($event) => unref(game).startNewGame()
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` New Game `);
          } else {
            return [
              createTextVNode(" New Game ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/GameControls.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "LocalGame",
  __ssrInlineRender: true,
  emits: ["up", "down", "left", "right", "update:seed"],
  setup(__props, { emit }) {
    const board = ref();
    const { play } = useFireworks();
    const { direction } = useSwipe(board, {
      threshold: 10
    });
    const game = useGameStore();
    const showWonState = ref(false);
    watch(direction, () => {
      if (direction.value === SwipeDirection.UP)
        game.localGame.up();
      if (direction.value === SwipeDirection.DOWN)
        game.localGame.down();
      if (direction.value === SwipeDirection.LEFT)
        game.localGame.left();
      if (direction.value === SwipeDirection.RIGHT)
        game.localGame.right();
    });
    game.localGame.onWon(() => {
      play();
      showWonState.value = true;
    });
    watch(() => game.localGame.hasWon, () => {
      if (!game.localGame.hasWon)
        showWonState.value = false;
    });
    const canMove = computed(() => {
      if (showWonState.value)
        return false;
      if (game.localGame.isGameOver)
        return false;
      if (game.remoteGame.hasWon)
        return false;
      return true;
    });
    onKeyStroke(["ArrowUp", "w"], () => {
      if (!canMove.value)
        return;
      game.localGame.up();
      emit("up");
    });
    onKeyStroke(["ArrowDown", "s"], () => {
      if (!canMove.value)
        return;
      game.localGame.down();
      emit("down");
    });
    onKeyStroke(["ArrowLeft", "a"], () => {
      if (!canMove.value)
        return;
      game.localGame.left();
      emit("left");
    });
    onKeyStroke(["ArrowRight", "d"], () => {
      if (!canMove.value)
        return;
      game.localGame.right();
      emit("right");
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_GameControls = _sfc_main$4;
      const _component_Button = _sfc_main$a;
      const _component_Board = _sfc_main$b;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_GameControls, { "mb-2": "" }, null, _parent));
      _push(`<div relative>`);
      _push(ssrRenderComponent(_sfc_main$6, {
        hide: !(unref(game).localGame.isGameOver || unref(game).remoteGame.hasWon)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div text-5xl font-black${_scopeId}> Game Over </div>`);
            _push2(ssrRenderComponent(_component_Button, {
              onClick: ($event) => unref(game).startNewGame()
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Play Again `);
                } else {
                  return [
                    createTextVNode(" Play Again ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", {
                "text-5xl": "",
                "font-black": ""
              }, " Game Over "),
              createVNode(_component_Button, {
                onClick: ($event) => unref(game).startNewGame()
              }, {
                default: withCtx(() => [
                  createTextVNode(" Play Again ")
                ]),
                _: 1
              }, 8, ["onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$6, {
        hide: !showWonState.value
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div text-5xl font-black${_scopeId}> You Won! </div>`);
            if (!unref(game).isMultiplayerGameOpen) {
              _push2(ssrRenderComponent(_component_Button, {
                onClick: ($event) => showWonState.value = false
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Continue `);
                  } else {
                    return [
                      createTextVNode(" Continue ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(_component_Button, {
                onClick: ($event) => unref(game).startNewGame()
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Play Again `);
                  } else {
                    return [
                      createTextVNode(" Play Again ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            }
          } else {
            return [
              createVNode("div", {
                "text-5xl": "",
                "font-black": ""
              }, " You Won! "),
              !unref(game).isMultiplayerGameOpen ? (openBlock(), createBlock(_component_Button, {
                key: 0,
                onClick: ($event) => showWonState.value = false
              }, {
                default: withCtx(() => [
                  createTextVNode(" Continue ")
                ]),
                _: 1
              }, 8, ["onClick"])) : (openBlock(), createBlock(_component_Button, {
                key: 1,
                onClick: ($event) => unref(game).startNewGame()
              }, {
                default: withCtx(() => [
                  createTextVNode(" Play Again ")
                ]),
                _: 1
              }, 8, ["onClick"]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div>`);
      _push(ssrRenderComponent(_component_Board, {
        board: unref(game).localGame.board,
        score: unref(game).localGame.score
      }, null, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/LocalGame.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<nav${ssrRenderAttrs(mergeProps({
    "h-18": "",
    fixed: "",
    "top-0": "",
    "left-0": "",
    "right-0": ""
  }, _attrs))}><div max-w-1200px h-full mx-auto flex flex-row items-center px-4><span flex-1></span><a href="https://github.com" target="_blank"><i i-carbon-logo-github block text-2xl text-white></i></a></div></nav>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/Navigation.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __unplugin_components_0 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "RemoteGameSmall",
  __ssrInlineRender: true,
  setup(__props) {
    const game = useGameStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Tile = _sfc_main$c;
      const _component_CopyLink = _sfc_main$7;
      _push(`<div${ssrRenderAttrs(mergeProps({
        fixed: "",
        "top-0": "",
        "left-0": "",
        "right-0": "",
        "p-4": "",
        flex: "",
        "flex-row": "",
        "place-items-center": ""
      }, _attrs))}><div bg-dark-200 rounded mx-auto class="gt-lg:hidden" shadow-lg p2 flex flex-row>`);
      if (!unref(game).isWaitingForOtherPlayer) {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_component_Tile, {
          value: unref(game).remoteGame.largestTile,
          "w-14": "",
          "h-14": "",
          op50: "",
          "filter-grayscale-100": ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(game).remoteGame.largestTile)}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(game).remoteGame.largestTile), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div flex flex-col pl-2 justify-center><span text-lg font-medium> Opponent </span><span mt="-1" op50> Score: ${ssrInterpolate(unref(game).remoteGame.score)}</span></div><!--]-->`);
      } else {
        _push(`<div p-2 flex flex-row items-center>`);
        _push(ssrRenderComponent(Spinner, {
          "w-6": "",
          "h-6": ""
        }, null, _parent));
        _push(`<span> Waiting for other player... </span>`);
        _push(ssrRenderComponent(_component_CopyLink, { "ml-2": "" }, null, _parent));
        _push(`</div>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/RemoteGameSmall.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "App",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Vue 2048",
      meta: [
        { name: "description", content: "The 2048 Game written in Vue with Multiplayer Support" }
      ]
    });
    const game = useGameStore();
    const parmas = new URLSearchParams(window.location.search);
    const gameId = parmas.get("game");
    if (gameId)
      game.joinMultiplayerGame(gameId);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Navigation = __unplugin_components_0;
      const _component_LocalGame = _sfc_main$3;
      const _component_RemoteGame = _sfc_main$5;
      const _directive_auto_animate = resolveDirective("auto-animate");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_Navigation, null, null, _parent));
      _push(`<main h-screen flex flex-col bg-primary text-foreground select-none><div p-4 grid h-full place-items-center><div${ssrRenderAttrs(mergeProps({
        grid: "",
        class: { "lg:grid-cols-2": unref(game).isMultiplayerGameOpen },
        "grid-cols-1": "",
        "gap-4": "",
        "place-content-center": "",
        "max-w": "1200px",
        "w-full": "",
        "mx-auto": ""
      }, ssrGetDirectiveProps(_ctx, _directive_auto_animate, { duration: 100 })))}><div max-w="600px" mx-auto w-full class="${ssrRenderClass({ "lt-lg:pt-16": unref(game).isMultiplayerGameOpen })}">`);
      _push(ssrRenderComponent(_component_LocalGame, null, null, _parent));
      if (unref(game).isMultiplayerGameOpen) {
        _push(`<div font-bold text-center text-2xl mt-4> You </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(game).isMultiplayerGameOpen) {
        _push(`<!--[--><div class="lt-lg:hidden">`);
        _push(ssrRenderComponent(_component_RemoteGame, null, null, _parent));
        _push(`<div font-bold text-center text-2xl mt-4> Opponent </div></div>`);
        _push(ssrRenderComponent(_sfc_main$1, { class: "lg:hidden" }, null, _parent));
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></main><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/App.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const tailwind = "";
const __uno = "";
const main = "";
const createApp = ViteSSG(_sfc_main, ({ app }) => {
  app.use(createPinia()).use(autoAnimatePlugin);
});
export {
  createApp
};
