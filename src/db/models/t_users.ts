import { Model, DataTypes } from 'sequelize';
import { MODELS, TABLES } from '../../constants';
import { DB_CONN } from '../dbConnection';

export default class UserMasterModel extends Model {
  public id: number;
  public username: string;
  public email: string;
  public password: string;
  public role: string;
  public created_at: Date;
  public updated_at: Date;
}

UserMasterModel.init(
  {
    id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      allowNull: false,
      defaultValue: 'user'
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
    modelName: MODELS.t_users,
    tableName: TABLES.t_users,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);
