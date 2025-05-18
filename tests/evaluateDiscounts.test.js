// test/evaluateDiscounts.test.js
import { describe, it, expect } from 'vitest';
import { evaluateDiscounts } from '../src/utils/evaluateDiscounts';

describe('Discount Evaluator Unit Tests', () => {
  it('applies fixed discount', () => {
    const input = {
      originalPrice: 100,
      discounts: [{ type: 'fixed', value: 10 }]
    };
    const result = evaluateDiscounts(input.originalPrice, input.discounts);
    expect(result.finalPrice).toBe(90);
    expect(result.applied[0]).toEqual({ type: 'fixed', amount: 10 });
  });

  it('applies percentage discount', () => {
    const input = {
      originalPrice: 200,
      discounts: [{ type: 'percentage', value: 10 }]
    };
    const result = evaluateDiscounts(input.originalPrice, input.discounts);
    expect(result.finalPrice).toBe(180);
    expect(result.applied[0].type).toBe('percentage');
  });

  it('applies conditional discount when condition met', () => {
    const input = {
      originalPrice: 250,
      discounts: [{ type: 'conditional', condition: 200, value: 20 }]
    };
    const result = evaluateDiscounts(input.originalPrice, input.discounts);
    expect(result.finalPrice).toBe(230);
  });

  it('does not apply conditional discount if condition not met', () => {
    const input = {
      originalPrice: 150,
      discounts: [{ type: 'conditional', condition: 200, value: 20 }]
    };
    const result = evaluateDiscounts(input.originalPrice, input.discounts);
    expect(result.finalPrice).toBe(150);
    expect(result.applied.length).toBe(0);
  });

  it('applies tiered discount correctly', () => {
    const input = {
      originalPrice: 120,
      discounts: [{
        type: 'tiered',
        tiers: [
          { min: 0, max: 99, value: 5 },
          { min: 100, max: 199, value: 10 },
          { min: 200, max: 9999, value: 25 }
        ]
      }]
    };
    const result = evaluateDiscounts(input.originalPrice, input.discounts);
    expect(result.finalPrice).toBe(110);
    expect(result.applied[0]).toEqual({ type: 'tiered', amount: 10 });
  });

  it('caps the total discount if exceeds maxDiscount', () => {
    const input = {
      originalPrice: 300,
      discounts: [
        { type: 'fixed', value: 50 },
        { type: 'percentage', value: 20 },
        { type: 'cap', maxDiscount: 60 }
      ]
    };
    const result = evaluateDiscounts(input.originalPrice, input.discounts);
    expect(result.finalPrice).toBe(240); // 300 - 60 (cap)
    const capApplied = result.applied.find(d => d.type === 'cap');
    expect(capApplied).toEqual({
      type: 'cap',
      originalDiscountTotal: 100,
      cappedAt: 60
    });
  });

  it('applies combined discounts correctly', () => {
    const input = {
      originalPrice: 100,
      discounts: [
        { type: 'fixed', value: 10 },
        { type: 'percentage', value: 10 }
      ]
    };
    const result = evaluateDiscounts(input.originalPrice, input.discounts);
    expect(result.finalPrice).toBe(81);
  });
});
