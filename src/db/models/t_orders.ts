import { Model, DataTypes } from 'sequelize';
import { MODELS, TABLES } from '../../constants';
import { DB_CONN } from '../dbConnection';

export default class OrdersMasterModel extends Model {
  public id: number;
  public user_id: number;
  public total_amount: number;
  public order_date: Date;
  public created_at: Date;
  public updated_at: Date;
}

OrdersMasterModel.init(
  {
    id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    order_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    created_at: {
      type: DataTypes.NOW,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.NOW,
      allowNull: false
    }
  },
  {
    sequelize: DB_CONN,
    modelName: MODELS.t_orders,
    tableName: TABLES.t_orders,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);
