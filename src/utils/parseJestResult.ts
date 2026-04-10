export const parseJestResult = (data: string) => {
  try {
    const json = JSON.parse(data);

    if (json.error) {
      return json; 
    }

    const tests = json.testResults.flatMap((suite: any) =>
      suite.assertionResults.map((test: any) => ({
        title: test.title,
        status: test.status,
        error: test.failureMessages?.[0] || null
      }))
    );

    return {
      summary: {
        total: json.numTotalTests,
        passed: json.numPassedTests,
        failed: json.numFailedTests
      },
      tests
    };

  } catch {
    return { error: "Parsing failed" };
  }
};