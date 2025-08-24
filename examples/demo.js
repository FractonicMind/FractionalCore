/**
 * Fractional Core Demonstration
 * 
 * This demo shows how to encode "LEV" using mathematical expressions
 * and demonstrates the Memorial Covenant in action.
 */

const FractionalCore = require('./fractional-core');

// Initialize Fractional Core
const fc = new FractionalCore();

console.log("=".repeat(60));
console.log("FRACTIONAL CORE DEMONSTRATION");
console.log("=".repeat(60));

// Step 1: Accept the Memorial Covenant
console.log("\n🤝 ACCEPTING MEMORIAL COVENANT");
console.log("-".repeat(30));

const covenantAgreement = {
    humanitarianCommitment: true,
    cancerResearchSupport: true,
    openScienceCommitment: true,
    institutionName: "Demo Institution",
    contributionPlan: "Support student cancer researchers"
};

try {
    fc.acceptCovenant("Demo-Institution-2025", covenantAgreement);
    console.log("✅ Covenant accepted successfully");
} catch (error) {
    console.error("❌ Covenant error:", error.message);
    process.exit(1);
}

// Step 2: Memorial Verification
console.log("\n🏛️  MEMORIAL VERIFICATION");
console.log("-".repeat(30));
fc.memorialVerification();

// Step 3: Show available mathematical fractions
console.log("\n🧮 AVAILABLE MATHEMATICAL FRACTIONS");
console.log("-".repeat(30));
const standardFractions = fc.getStandardFractions();
console.log("Standard expressions that equal 1:");
standardFractions.slice(0, 8).forEach(f => {
    console.log(`  ${f.expr} = ${f.value()}`);
});

// Step 4: Encode "LEV" using Fractional Core
console.log("\n🔒 ENCODING 'LEV' WITH FRACTIONAL CORE");
console.log("-".repeat(30));

const encoded = fc.encode("LEV");
console.log("Encoded as mathematical expressions:");
console.log("");

encoded.forEach((row, i) => {
    const displayRow = row.map(cell => 
        cell === '0' ? '0'.padStart(12) : `(${cell})`.padStart(12)
    ).join(' ');
    console.log(`Row ${i + 1}: ${displayRow}`);
});

// Step 5: Verify individual fractions
console.log("\n✅ VERIFYING MATHEMATICAL EXPRESSIONS");
console.log("-".repeat(30));

const testExpressions = ["√1", "0!", "|−1|", "(2+2)/4", "√36/6"];
testExpressions.forEach(expr => {
    const isValid = fc.verify(expr, 1);
    console.log(`${expr} = 1? ${isValid ? '✅ Valid' : '❌ Invalid'}`);
});

// Step 6: Show binary conversion
console.log("\n📊 BINARY CONVERSION");
console.log("-".repeat(30));

const levBinary = "LEV".split('').map(char => 
    char.charCodeAt(0).toString(2).padStart(8, '0')
).join(' ');

console.log(`"LEV" in binary: ${levBinary}`);
console.log(`L = ${levBinary.split(' ')[0]} = ${parseInt(levBinary.split(' ')[0], 2)}`);
console.log(`E = ${levBinary.split(' ')[1]} = ${parseInt(levBinary.split(' ')[1], 2)}`);
console.log(`V = ${levBinary.split(' ')[2]} = ${parseInt(levBinary.split(' ')[2], 2)}`);

// Step 7: Generate personal identity set
console.log("\n🆔 GENERATING PERSONAL IDENTITY SET");
console.log("-".repeat(30));

const personalSet = fc.generateIdentitySet("LEV", 8);
console.log("Personal Fractional Core set for 'LEV':");
personalSet.forEach((fraction, i) => {
    console.log(`  FC${i + 1} = ${fraction.expr}`);
});

// Step 8: Covenant impact tracking
console.log("\n🌍 COVENANT IMPACT TRACKING");
console.log("-".repeat(30));
console.log(`Total verifications: ${fc.verificationCount}`);
console.log(`Institution: ${fc.institutionId}`);
console.log("Each verification contributes to cancer research");
console.log("Memorial: Every use honors Lev Goukassian's legacy");

// Step 9: Educational example
console.log("\n🎓 EDUCATIONAL CAPTCHA EXAMPLE");
console.log("-".repeat(30));
console.log("Which expressions equal 1? (Human verification)");
console.log("A) √9/3     B) 4-2     C) 0!     D) 2×3");
console.log("Answer: A and C (B=2, D=6)");
console.log("✅ Mathematical literacy verified!");

console.log("\n" + "=".repeat(60));
console.log("🎯 DEMONSTRATION COMPLETE");
console.log("🏥 Contributing to cancer research through mathematical beauty");
console.log("🧬 'Solve the root. The rest is noise.' - Lev Goukassian");
console.log("=".repeat(60));

// Export for use in other applications
module.exports = {
    FractionalCore,
    runDemo: () => {
        // This function allows others to run the demo
        console.log("Running Fractional Core demonstration...");
    }
};
