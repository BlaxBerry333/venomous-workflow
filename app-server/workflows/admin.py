from django.contrib import admin
from .models import WorkflowDataModel


@admin.register(WorkflowDataModel)
class WorkflowDataAdmin(admin.ModelAdmin):
    """
    Workflow Data Admin Class
    """

    list_display = ("id", "user", "is_active", "name", "created_at", "updated_at")
    list_filter = ("created_at", "updated_at")
    list_per_page = 20
    ordering = ("id",)
    search_fields = ("id", "name")
    readonly_fields = ("id", "get_user_id", "created_at", "updated_at")
    fieldsets = (
        (
            "Workflow Data User Information",
            {"fields": ("user", "get_user_id")},
        ),
        (
            "Workflow Data Basic",
            {"fields": ("name", "description", "element", "is_active")},
        ),
        (
            "Workflow Data Information",
            {"fields": ("created_at", "updated_at")},
        ),
    )

    def get_user_id(self, obj):
        """
        user.id
        """
        return obj.user.id if obj.user else None

    get_user_id.admin_order_field = "user__id"
    get_user_id.short_description = "User ID"
