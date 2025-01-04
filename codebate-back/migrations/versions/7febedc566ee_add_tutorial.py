"""add tutorial

Revision ID: 7febedc566ee
Revises: 0e0525e77974
Create Date: 2025-01-02 18:21:04.394551

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '7febedc566ee'
down_revision = '0e0525e77974'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('language',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=200), nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('tutorial',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=200), nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('content', sa.Text(), nullable=False),
    sa.Column('language_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['language_id'], ['language.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('blog', schema=None) as batch_op:
        batch_op.alter_column('description',
               existing_type=mysql.VARCHAR(length=500),
               type_=sa.Text(),
               existing_nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('blog', schema=None) as batch_op:
        batch_op.alter_column('description',
               existing_type=sa.Text(),
               type_=mysql.VARCHAR(length=500),
               existing_nullable=True)

    op.drop_table('tutorial')
    op.drop_table('language')
    # ### end Alembic commands ###