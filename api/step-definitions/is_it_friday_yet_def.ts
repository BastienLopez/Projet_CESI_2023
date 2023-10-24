import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'assert';
import { isItFriday } from '../src';

Given('today is {string}', async function (givenDay: string) {
	this.today = givenDay;
});

When("I ask whether it's Friday yet", async function () {
	this.actualAnswer = isItFriday(this.today);
});

Then('I should be told {string}', async function (expectedAnswer: string) {
	assert.strictEqual(this.actualAnswer, expectedAnswer);
});
