/**
 * @jest-environment jsdom
 */

 import { pushToHistory } from '../scripts/router.js';
 
 // group tests together
 describe('pushToHistory test', () => {

   test('settings state test', () => {
     const settings = pushToHistory('settings', 0)
     expect(settings.state.page).toBe('settings');
     expect(settings.length).toBe(2);
   });

   test('entry test', () => {
     const entry = pushToHistory('entry', 1);
     expect(entry.state.page).toBe('entry1');
     expect(entry.length).toBe(3);
   });

   test('default test', () => {
     const defaultTest = pushToHistory('test', 0);
     expect(defaultTest.state.page).toBe(undefined);
     expect(defaultTest.length).toBe(4);
   });
 })