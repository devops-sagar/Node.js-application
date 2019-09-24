/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.INTEGER(11)
        },
        user_type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        access_token: {
            type: DataTypes.STRING,
            allowNull: true
        },
        login_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        salt: {
            type: DataTypes.STRING,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        tableName: 'users',
        classMethods: {
            associate: function (models) {
                this.hasMany(models.Post, { foreignKey: 'fk_user_id' });
            }
        },
    });
};