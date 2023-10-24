Feature: Create Staff
    need create staff

    Scenario: Supervisor create staff
        Given supervisor sends all info to create un "staff" 
        When supervisor wants to create a staff
        Then supervisor should see the "staff"
