import { Balance } from '../database/models';

class BalanceController {
  async getAllBalance(req, res) {
    const balances = await Balance.findAll({ where: { user_id: req.user.id } });
    res.status(200).json({
      message: 'balances retrieved successfully',
      balances,
    });
  }
  async create(req, res) {
    const { amount, amount_per_day } = req.body;
    const number_of_days = parseInt(amount / amount_per_day);
    const newBalance = {
      amount,
      amount_per_day,
      user_id: req.user.id,
      number_of_days: number_of_days,
      balance: amount,
    };
    await Balance.create(newBalance);
    res.status(200).json({
      message: 'Balance created successfully',
      balance: newBalance,
    });
  }
  async update(req, res) {
    const { amount_per_day } = req.body;
    const { id } = req.params;
    const amountToUpdate = await Balance.findOne({
      where: { id, user_id: req.user.id },
    });
    if (!amountToUpdate) {
      return res.status(404).json({
        error: 'amount not found',
      });
    }

    const number_of_days = parseInt(amountToUpdate.amount / amount_per_day);

    const updateBalance = await Balance.update(
      { amount_per_day, number_of_days: number_of_days },
      {
        where: { id },
        returning: true,
      }
    );

    res.status(200).json({
      message: 'updated successfully',
      balance: updateBalance[1][0],
    });
  }
  async decrease(req, res) {
    const { id } = req.params;
    const balanceToIncrease = await Balance.findOne({
      where: { id, user_id: req.user.id },
    });
    if (!balanceToIncrease) {
      return res.status(404).json({
        error: 'Balance not found',
      });
    }
    const increasedBalance = await Balance.update(
      {
        number_of_days:
          balanceToIncrease.number_of_days > 0
            ? balanceToIncrease.number_of_days - 1
            : balanceToIncrease.number_of_days,
        balance:
          balanceToIncrease.balance > balanceToIncrease.amount_per_day
            ? balanceToIncrease.balance - balanceToIncrease.amount_per_day
            : balanceToIncrease.balance,
      },
      { where: { id }, returning: true }
    );

    res.status(200).json({
      message: 'balance increased successfully',
      balance: increasedBalance[1][0],
    });
  }
}
export default BalanceController;
