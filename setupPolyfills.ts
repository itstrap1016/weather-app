import { TextEncoder, TextDecoder } from "util";
import {
  ReadableStream,
  WritableStream,
  TransformStream,
} from "node:stream/web";

// jsdom 환경에서 필요한 API들을 추가합니다.
Object.assign(globalThis, {
  TextEncoder,
  TextDecoder,
  ReadableStream,
  WritableStream,
  TransformStream,
});

// BroadcastChannel mock 추가
class BroadcastChannelMock {
  public onmessage:
    | ((this: BroadcastChannelMock, ev: MessageEvent) => any)
    | null = null;
  public onmessageerror:
    | ((this: BroadcastChannelMock, ev: MessageEvent) => any)
    | null = null;

  constructor(public name: string) {}

  postMessage(message: any) {
    // MSW 테스트에서는 실제로 사용되지 않으므로 빈 구현
  }

  addEventListener() {
    // MSW 테스트에서는 실제로 사용되지 않으므로 빈 구현
  }

  removeEventListener() {
    // MSW 테스트에서는 실제로 사용되지 않으므로 빈 구현
  }

  dispatchEvent(_event: Event): boolean {
    // MSW 테스트에서는 실제로 사용되지 않으므로 빈 구현
    return false;
  }

  close() {
    // MSW 테스트에서는 실제로 사용되지 않으므로 빈 구현
  }
}

(globalThis as any).BroadcastChannel = BroadcastChannelMock;

import "whatwg-fetch";
