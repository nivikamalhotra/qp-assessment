import { Model, DataTypes } from 'sequelize';
import { MODELS, TABLES } from '../../constants';
import { DB_CONN } from '../dbConnection';

export default class OrderItemsModel extends Model {
  public id: number;
  public order_id: number;
  public item_id: number;
  public quantity: number;
  public subtotal: number;
  public created_at: Date;
  public updated_at: Date;
}

OrderItemsModel.init(
  {
    id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    order_id: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    item_id: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
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
    modelName: MODELS.t_order_items,
    tableName: TABLES.t_order_items,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);
