import { Model, DataTypes } from 'sequelize';
import { MODELS, TABLES } from '../../constants';
import { DB_CONN } from '../dbConnection';

export default class ItemMasterModel extends Model {
  public id: number;
  public name: string;
  public price: number;
  public inventory: number;
  public created_at: Date;
  public updated_at: Date;
}

ItemMasterModel.init(
  {
    id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    inventory: {
      type: DataTypes.INTEGER,
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
    modelName: MODELS.t_items,
    tableName: TABLES.t_items,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);
