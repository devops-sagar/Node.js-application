/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Post', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        fk_user_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'User',
                key: 'id'
            }
        },
        offender_social_info: {
            type: DataTypes.STRING,
            allowNull: false
        },
        offender_user_info: {
            type: DataTypes.STRING,
            allowNull: false
        },
        media_type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        media_url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: true
            // 1 = Pending, 2 = Approve, 3 = Reject
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
        tableName: 'posts',
        classMethods: {
            associate: function (models) {
                this.belongsTo(models.User, { foreignKey: 'fk_user_id' });
            }
        },
    });
};