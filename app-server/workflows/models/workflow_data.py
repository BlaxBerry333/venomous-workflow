import json
import uuid

from django.db import models


class WorkflowDataModel(models.Model):
    """
    Model of Workflow Data
    """

    MAX_AMOUNT_OF_INSTANCE = 100
    MAX_AMOUNT_OF_ELEMENT_NODES = 500
    DEFAULT_VALUE_OF_ELEMENT = {"nodes": [], "edges": []}

    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        verbose_name="ID",
        editable=False,
        help_text="( UUID )",
    )
    user = models.ForeignKey(
        "accounts.CustomUserModel",
        on_delete=models.CASCADE,
        db_column="user_id",
        verbose_name="User",
    )
    name = models.CharField(
        max_length=100,
        blank=True,
        default="",
        verbose_name="Name",
        help_text="( 100 字符以内 )",
    )
    description = models.CharField(
        max_length=250,
        blank=True,
        default="",
        verbose_name="Description",
        help_text="( 250 字符以内 )",
    )
    element = models.TextField(
        blank=True,
        default=json.dumps(DEFAULT_VALUE_OF_ELEMENT),
        verbose_name="Nodes & Edges",
        help_text="( JSON String, Must Contain Nodes & Edges )",
    )
    is_active = models.BooleanField(
        default=False,
        verbose_name="Is Active",
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        editable=False,
        verbose_name="Created At",
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        editable=False,
        verbose_name="Updated At",
    )

    def __str__(self):
        return str(self.id)

    class Meta:
        db_table = "workflow_data"
        verbose_name_plural = "Workflow Data"
        ordering = ["id"]
