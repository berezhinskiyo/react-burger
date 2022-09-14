import {TWSInitialState} from '../../utils/data'
export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS : 'WS_CONNECTION_SUCCESS'= 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR : 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED : 'WS_CONNECTION_CLOSED'= 'WS_CONNECTION_CLOSED';
export const WS_CONNECTION_CLOSE : 'WS_CONNECTION_CLOSE'= 'WS_CONNECTION_CLOSE';
export const WS_GET_MESSAGE :'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_GET_MESSAGE_LOCAL : 'WS_GET_MESSAGE_LOCAL'= 'WS_GET_MESSAGE_LOCAL';

export interface IConnectionStart {
    readonly type: typeof WS_CONNECTION_START;
}

export interface IConnectionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS;
}
export interface IConnectionError {
    readonly type: typeof WS_CONNECTION_ERROR;
}
export interface IConnectionClosed {
    readonly type: typeof WS_CONNECTION_CLOSED;
}
export interface IConnectionClose {
    readonly type: typeof WS_CONNECTION_CLOSE;
}
export interface IGetMessage {
    readonly type: typeof WS_GET_MESSAGE;
    payload : TWSInitialState;
}
export interface IGetMessageLocal {
    readonly type: typeof WS_GET_MESSAGE_LOCAL;
    payload : TWSInitialState;
}
export type  TWSAction = IConnectionSuccess|IConnectionError|IConnectionClosed|IConnectionClose|IGetMessage|IGetMessageLocal;
