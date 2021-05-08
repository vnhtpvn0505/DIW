/**
 * Copyright 2017 MaddHacker
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const om = require('../../lib/out');
const O = new om.Out();
const stringz = require('string-utilz');

// hijack the output for tests
var __lastLog;
O.output = (logMsg) => { __lastLog = logMsg; };
// hijack all output, regardless of level set output
var __allLogs;
O.onLog = (msg, lvl) => { __allLogs = msg; O.levelFilter(msg, lvl); };
// format the messages
O.fmt = (msg, lvl) => { return msg; };

/**
 * Abstraction of an expected positive output
 */
function testPositiveOutput(logLevel, oFxn, tmpStr) {
    for (let lvl in om.LogLevel) {
        let tmpLvl = om.LogLevel[lvl];
        if (tmpLvl.value <= logLevel.value) {
            __lastLog = null, __allLogs = null;
            O.level = tmpLvl;
            let tmpMsg = stringz.fmt('%{0}%{1}', 'hello #', tmpStr);
            oFxn(tmpMsg);
            expect(__lastLog).not.toBe(null);
            expect(__allLogs).not.toBe(null);
            expect(__lastLog).toBe(tmpMsg);
            expect(__allLogs).toBe(tmpMsg);
        }
    }
}

/**
 * Abstraction of an expected negative output (no log)
 */
function testNegativeOutput(logLevel, oFxn) {
    for (let lvl in om.LogLevel) {
        let tmpLvl = om.LogLevel[lvl];
        if (tmpLvl.value > logLevel.value) {
            __lastLog = null, __allLogs = null;
            O.level = tmpLvl;
            let tmpMsg = 'hello #fail';
            oFxn(tmpMsg);
            expect(__lastLog).toBe(null);
            expect(__allLogs).not.toBe(null);
            expect(__allLogs).toBe(tmpMsg);
        }
    }
}

describe('Out (Unit)', () => {

    describe('get #level()', () => {
        it('should be set to INFO by default', () => {
            expect(O.level).toBe(om.LogLevel.INFO);
        });
        it('set #level() & should reflect changes immediately', () => {
            for (let lvl in om.LogLevel) {
                O.level = om.LogLevel[lvl];
                expect(O.level).toBe(om.LogLevel[lvl]);
            }
        });
    });

    /**
     * TRACE functionality
     * #t()
     * #trace()
     */
    describe('#t()', () => {
        it('should output trace when level set to trace', () => {
            testPositiveOutput(om.LogLevel.TRACE, O.t, 't');
        });
        it('should not output trace when level set to debug or higher', () => {
            testNegativeOutput(om.LogLevel.TRACE, O.t);
        });
    });

    describe('#trace()', () => {
        it('should output trace when level set to trace', () => {
            testPositiveOutput(om.LogLevel.TRACE, O.trace, 'trace');
        });
        it('should not output trace when level set to debug or higher', () => {
            testNegativeOutput(om.LogLevel.TRACE, O.trace);
        });
    });

    /**
     * DEBUG functionality
     * #d()
     * #debug()
     */
    describe('#d()', () => {
        it('should output debug when level set to debug or lower', () => {
            testPositiveOutput(om.LogLevel.DEBUG, O.d, 'd');
        });
        it('should not output debug when level set to info or higher', () => {
            testNegativeOutput(om.LogLevel.DEBUG, O.d);
        });
    });

    describe('#debug()', () => {
        it('should output debug when level set to debug or lower', () => {
            testPositiveOutput(om.LogLevel.DEBUG, O.debug, 'debug');
        });
        it('should not output debug when level set to info or higher', () => {
            testNegativeOutput(om.LogLevel.DEBUG, O.debug);
        });
    });

    /**
     * INFO functionality
     * #i()
     * #info()
     */
    describe('#i()', () => {
        it('should output info when level set to info or lower', () => {
            testPositiveOutput(om.LogLevel.INFO, O.i, 'i');
        });
        it('should not output info when level set to warn or higher', () => {
            testNegativeOutput(om.LogLevel.INFO, O.i);
        });
    });

    describe('#info()', () => {
        it('should output info when level set to info or lower', () => {
            testPositiveOutput(om.LogLevel.INFO, O.info, 'info');
        });
        it('should not output info when level set to warn or higher', () => {
            testNegativeOutput(om.LogLevel.INFO, O.info);
        });
    });

    /**
     * WARN functionality
     * #w()
     * #warn()
     */
    describe('#w()', () => {
        it('should output warn when level set to warn or lower', () => {
            testPositiveOutput(om.LogLevel.WARN, O.w, 'w');
        });
        it('should not output warn when level set to error or higher', () => {
            testNegativeOutput(om.LogLevel.WARN, O.w);
        });
    });

    describe('#warn()', () => {
        it('should output warn when level set to warn or lower', () => {
            testPositiveOutput(om.LogLevel.WARN, O.warn, 'warn');
        });
        it('should not output warn when level set to error or higher', () => {
            testNegativeOutput(om.LogLevel.WARN, O.warn);
        });
    });

    /**
     * ERROR functionality
     * #e()
     * #error()
     */
    describe('#e()', () => {
        it('should output error when level set to error or lower', () => {
            testPositiveOutput(om.LogLevel.ERROR, O.e, 'e');
        });
        it('should not output error when level set to fatal or higher', () => {
            testNegativeOutput(om.LogLevel.ERROR, O.e);
        });
    });

    describe('#error()', () => {
        it('should output error when level set to error or lower', () => {
            testPositiveOutput(om.LogLevel.ERROR, O.error, 'error');
        });
        it('should not output error when level set to fatal or higher', () => {
            testNegativeOutput(om.LogLevel.ERROR, O.error);
        });
    });

    /**
     * FATAL functionality
     * #f()
     * #fatal()
     */
    describe('#f()', () => {
        it('should output fatal when level set to fatal or lower', () => {
            testPositiveOutput(om.LogLevel.FATAL, O.f, 'f');
        });
        it('should always output fatal', () => {
            testNegativeOutput(om.LogLevel.FATAL, O.f);
        });
    });

    describe('#fatal()', () => {
        it('should output fatal when level set to fatal or lower', () => {
            testPositiveOutput(om.LogLevel.FATAL, O.fatal, 'fatal');
        });
        it('should always output fatal', () => {
            testNegativeOutput(om.LogLevel.FATAL, O.fatal);
        });
    });
});
