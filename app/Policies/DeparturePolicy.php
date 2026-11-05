<?php

namespace App\Policies;

use App\Models\Departure;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class DeparturePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Departure $departure): bool
    {
        return true;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $this->isAdmin($user);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Departure $departure): bool
    {
        return $this->isAdmin($user);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Departure $departure): bool
    {
        return $this->isAdmin($user);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Departure $departure): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Departure $departure): bool
    {
        return false;
    }

    /**
     * Check if user is an admin.
     */
    protected function isAdmin(User $user): bool
    {
        return in_array($user->email, config('admin.emails', []));
    }
}
