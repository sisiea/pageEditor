import CommonSpin from '../common-spin';
import * as React from 'react';
import {EmitterKeys} from "../../../store/emitter_keys";
export default class GlobalSpin extends CommonSpin{
    static storeKey = EmitterKeys.system.globalSpinning ;
}