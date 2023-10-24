import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { listCourses } from '../src';

Given(
	'a pilot and the promotion reference is {string}',
	async function (givenPromotionRef: string) {
		this.promotionRef = givenPromotionRef;
		this.pilot = new Staff();
	}
);

When("he wants to see promotion's courses", async function () {
	this.coursesReponses = listCourses(this.pilot.id, this.promotionRef);
});

Then("he should see the promotion's courses", async function () {
	expect(this.coursesReponses).to.be.an('array');
});
