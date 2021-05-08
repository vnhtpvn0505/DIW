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

const datez = require('../../lib/date-utilz');
datez.addDatePrototypes();

describe('Date Utils (Unit)', () => {
    /**
    * check datez#pad(tmpStr, num, char)
    */
    describe('datez#date()', () => {
        it('return current date as ISOString', () => {
            expect(datez.date()).not.toBe(null);
        });
    });

    describe('datez#httpDate()', () => {
        it('return current date as HTTP-date string', () => {
            expect(datez.httpDate()).not.toBe(null);
            console.log(datez.httpDate());
        });
    });

    /**
    * check datez#pad(tmpStr, num, char)
    */
    describe('datez#pad(tmpStr, num, char)', () => {
        it('should use a space when no char is provided', () => {
            expect(datez.pad(1, 1)).toBe('10');
        });
        it('should return the given string when num is 0', () => {
            expect(datez.pad(1, 0)).toBe('1');
            expect(datez.pad(1, 0, '-')).toBe('1');
        });
        it('should pad multiple times', () => {
            expect(datez.pad(1, 5)).toBe('100000');

            expect(datez.pad(1, -5, '-')).toBe('-----1');
        });
        it('should pad to the left when negative', () => {
            expect(datez.pad(1, -5)).toBe('000001');
        });
        it('should handle multiple chars', () => {
            expect(datez.pad(10, -2, '000')).toBe('00000010');
            expect(datez.pad(10, 2, 1)).toBe('1011');
            expect(datez.pad(10, 2, '--')).toBe('10----');
        });
    });

    // /**
    // * check datez#fmt(args...) with indicies
    // */

    // describe('#fmt(args...) using indicies', () => {
    //     // it('should return the same string when there are no fmt args', () => {
    //     //     expect(datez.fmt('Sat', 'Sep')).toBe('Sun, 27 May 2018 17:52:00 MDT');
    //     // });
    //     // it('should return the same string when there are no fmt args', () => {
    //     //     expect('Sun, 27 May 2018 17:52:00 MDT'.fmt('Sat', 'Sep')).toBe('Sun, 27 May 2018 17:52:00 MDT');
    //     // });
    //     // it('should not replace open "{" at the beginning', () => {
    //     //     expect('%{0}, 27 %{s 2018 17:52:00 MDT'.fmt('Sun', 'May')).toBe('Sun, 27 %{s 2018 17:52:00 MDT');
    //     // });
    //     // it('should not replace open "{" all over the place', () => {
    //     //     expect('%{0}, 27 %{1 2018 17:52:00 %{s}'.fmt('Sun', 'May', 'MDT')).toBe('Sun, 27 %{s 2018 17:52:00 Sun');
    //     // });
    //     // it('should support indicies in the "{}"', () => {
    //     //     expect('%{0}, 27 %{1} 2018 17:52:00 %{2}'.fmt('Sun', 'May', 'MDT')).toBe('Sun, 27 May 2018 17:52:00 MDT');
    //     // });
    //     // it('should support indicies out of order in the "{}"', () => {
    //     //     expect('%{2}, 27 %{0} 2018 17:52:00 %{1}'.fmt('Sun', 'May', 'MDT')).toBe('MDT, 27 Sat 2018 17:52:00 May');
    //     // });
    //     // it('should support indicies and the "s" mixed in the "{}"', () => {
    //     //     expect('%{0}, 27 %{s} 2018 17:52:00 %{2}'.fmt('Sun', 'May', 'MDT')).toBe('Sun, 27 Sun 2018 17:52:00 MDT');
    //     // });
    //     // it('should support indicies out of order and the "s" mixed in the "{}"', () => {
    //     //     expect('%{2}, 27 %{s} 2018 17:52:00 %{0}'.fmt('Sun', 'May', 'MDT')).toBe('MDT, 27 Sun 2018 17:52:00 Sun');
    //     // });
    // });
});
