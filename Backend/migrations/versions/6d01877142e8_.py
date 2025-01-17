"""empty message

Revision ID: 6d01877142e8
Revises: b76c6b8f8914
Create Date: 2025-01-08 21:55:16.803162

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6d01877142e8'
down_revision = 'b76c6b8f8914'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('tutorial',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=200), nullable=False),
    sa.Column('content', sa.Text(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('language_name', sa.String(length=200), nullable=False),
    sa.ForeignKeyConstraint(['language_name'], ['language.name'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('tutorial')
    # ### end Alembic commands ###
