import { DataTypes } from 'sequelize'

const heroesSchema = {
  name: 'herois',
  schema: {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    poder: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },

  options: {
    tableName: 'tb_herois',
    freezeTableName: false,
    timestamps: false,
  },
}

export { heroesSchema }
