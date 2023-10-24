Feature: List courses
    User can list courses

    Scenario: Pilot can list promotion courses
        Given a pilot and the promotion reference is "RE2DN204"
        When he wants to see promotion's courses
        Then he should see the promotion's courses