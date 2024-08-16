document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('scheme-form');
    const schemeList = document.getElementById('scheme-list');
    const historyList = document.getElementById('history-list');

    const schemes = [
        // Schemes for Age 18 to 25
        {
            name: "Youth Skill Development Program",
            eligibility: {
                income: 50000,
                age: 18,
                gender: "Any",
                employment: "Unemployed",
                residence: "Any",
                education: "Any",
                marital: "Any",
                disability: "No",
                family: 1
            }
        },
        {
            name: "Pradhan Mantri Jan Dhan Yojana (PMJDY)",
            eligibility: {
                income: 200000,
                age: 18,
                gender: "Any",
                employment: "Any",
                residence: "Any",
                education: "Any",
                marital: "Any",
                disability: "No",
                family: 1
            }
        },
        {
            name: "Atal Pension Yojana (APY)",
            eligibility: {
                income: 200000,
                age: 18,
                gender: "Any",
                employment: "Any",
                residence: "Any",
                education: "Any",
                marital: "Any",
                disability: "No",
                family: 1
            }
        },
        {
            name: "Deen Dayal Upadhyaya Grameen Kaushalya Yojana (DDU-GKY)",
            eligibility: {
                income: 300000,
                age: 20,
                gender: "Any",
                employment: "Unemployed",
                residence: "Rural",
                education: "No Formal Education",
                marital: "Any",
                disability: "No",
                family: 1
            }
        },
        {
            name: "National Means-cum-Merit Scholarship Scheme",
            eligibility: {
                income: 150000,
                age: 22,
                gender: "Any",
                employment: "Any",
                residence: "Any",
                education: "High School",
                marital: "Any",
                disability: "No",
                family: 1
            }
        },

        // Schemes for Age 26 to 35
        {
            name: "Skill Development Scheme",
            eligibility: {
                income: 400000,
                age: 26,
                gender: "Any",
                employment: "Any",
                residence: "Urban",
                education: "Any",
                marital: "Any",
                disability: "No",
                family: 2
            }
        },
        {
            name: "Women Empowerment Scheme",
            eligibility: {
                income: 500000,
                age: 30,
                gender: "Female",
                employment: "Any",
                residence: "Any",
                education: "Any",
                marital: "Married",
                disability: "No",
                family: 3
            }
        },
        {
            name: "Child Education Assistance",
            eligibility: {
                income: 300000,
                age: 32,
                gender: "Any",
                employment: "Employed",
                residence: "Any",
                education: "Any",
                marital: "Any",
                disability: "No",
                family: 4
            }
        },

        // Schemes for Age 36 to 45
        {
            name: "Healthcare Subsidy Program",
            eligibility: {
                income: 500000,
                age: 36,
                gender: "Any",
                employment: "Any",
                residence: "Any",
                education: "Any",
                marital: "Any",
                disability: "No",
                family: 5
            }
        },
        {
            name: "Retirement Savings Scheme",
            eligibility: {
                income: 700000,
                age: 40,
                gender: "Any",
                employment: "Employed",
                residence: "Any",
                education: "Any",
                marital: "Any",
                disability: "No",
                family: 1
            }
        },
        {
            name: "Pradhan Mantri Awas Yojana (PMAY)",
            eligibility: {
                income: 600000,
                age: 45,
                gender: "Any",
                employment: "Any",
                residence: "Any",
                education: "Any",
                marital: "Any",
                disability: "No",
                family: 4
            }
        },

        // Schemes for Age 46 to 60
        {
            name: "Senior Citizens' Savings Scheme (SCSS)",
            eligibility: {
                income: 500000,
                age: 50,
                gender: "Any",
                employment: "Retired",
                residence: "Any",
                education: "Any",
                marital: "Any",
                disability: "No",
                family: 1
            }
        },
        {
            name: "Indira Gandhi National Old Age Pension Scheme (IGNOAPS)",
            eligibility: {
                income: 200000,
                age: 60,
                gender: "Any",
                employment: "Unemployed",
                residence: "Any",
                education: "Any",
                marital: "Any",
                disability: "No",
                family: 1
            }
        },
        {
            name: "Pradhan Mantri Vaya Vandana Yojana (PMVVY)",
            eligibility: {
                income: 500000,
                age: 60,
                gender: "Any",
                employment: "Retired",
                residence: "Any",
                education: "Any",
                marital: "Any",
                disability: "No",
                family: 1
            }
        }
    ];

    const history = [];

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const income = Number(formData.get('income'));
        const age = Number(formData.get('age'));
        const gender = formData.get('gender');
        const employment = formData.get('employment');
        const residence = formData.get('residence');
        const education = formData.get('education');
        const marital = formData.get('marital');
        const disability = formData.get('disability');
        const family = Number(formData.get('family'));

        // Save the form data to history
        history.push({ income, age, gender, employment, residence, education, marital, disability, family });
        updateHistory();

        // Filter schemes based on eligibility
        const filteredSchemes = schemes.filter(scheme => {
            return income <= scheme.eligibility.income &&
                age >= scheme.eligibility.age &&
                age <= (scheme.eligibility.age + 10) && // Age range from scheme eligibility to scheme eligibility + 10
                (scheme.eligibility.gender === "Any" || gender === scheme.eligibility.gender) &&
                (scheme.eligibility.employment === "Any" || employment === scheme.eligibility.employment) &&
                (scheme.eligibility.residence === "Any" || residence === scheme.eligibility.residence) &&
                (scheme.eligibility.education === "Any" || education === scheme.eligibility.education) &&
                (scheme.eligibility.marital === "Any" || marital === scheme.eligibility.marital) &&
                (scheme.eligibility.disability === "Any" || disability === scheme.eligibility.disability) &&
                family >= scheme.eligibility.family;
        });

        // Update the scheme list in the UI
        schemeList.innerHTML = '';
        if (filteredSchemes.length > 0) {
            filteredSchemes.forEach(scheme => {
                const li = document.createElement('li');
                li.textContent = scheme.name;
                schemeList.appendChild(li);
            });
        } else {
            const li = document.createElement('li');
            li.textContent = 'No schemes available for the given criteria.';
            schemeList.appendChild(li);
        }
    });

    function updateHistory() {
        historyList.innerHTML = '';
        history.forEach((entry, index) => {
            const li = document.createElement('li');
            li.textContent = `Search ${index + 1}: Income: ₹${entry.income}, Age: ${entry.age}, Gender: ${entry.gender}, Employment: ${entry.employment}, Residence: ${entry.residence}, Education: ${entry.education}, Marital Status: ${entry.marital}, Disability: ${entry.disability}, Family Size: ${entry.family}`;
            historyList.appendChild(li);
        });
    }

    // Initial call to display history on page load
    updateHistory();
});
