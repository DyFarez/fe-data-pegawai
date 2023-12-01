import { combineReducers } from "redux";
import pegawaiReducer from "./pegawaiReducer";
import daerahReducer from "./daerahReducer";
import modalReducer from "./modalReducer";

export default combineReducers({pegawaiReducer, daerahReducer, modalReducer})