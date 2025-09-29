export default function PlanSelector({ planList, selectedPlan, onPlanChange }) {
  return (
    <div className="form-floating mb-3">
      <select
        className="form-select"
        id="plan-selection"
        name="plans"
        value={selectedPlan}
        onChange={(e) => onPlanChange(e.target.value)}
      >
        {planList.map((plan) => (
          <option key={plan} value={plan}>
            {plan}
          </option>
        ))}
      </select>
      <label className="form-check-label" htmlFor="plan-selection">
        Plan selection:
      </label>
    </div>
  );
}
