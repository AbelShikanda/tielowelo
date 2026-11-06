<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BookingResource\Pages;
use App\Filament\Resources\BookingResource\RelationManagers;
use App\Models\Booking;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class BookingResource extends Resource
{
    protected static ?string $model = Booking::class;

    protected static ?string $navigationIcon = 'heroicon-o-ticket';

    protected static ?string $navigationGroup = 'Bookings';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('user_id')
                    ->relationship('user', 'name')
                    ->searchable()
                    ->preload(),
                Forms\Components\Select::make('departure_id')
                    ->relationship('departure', 'departure_date')
                    ->searchable()
                    ->preload(),
                Forms\Components\TextInput::make('reference')
                    ->required()
                    ->maxLength(255)
                    ->unique(Booking::class, 'reference', ignoreRecord: true),
                Forms\Components\TextInput::make('adults')
                    ->required()
                    ->numeric()
                    ->default(1),
                Forms\Components\TextInput::make('children')
                    ->required()
                    ->numeric()
                    ->default(0),
                Forms\Components\TextInput::make('total_price')
                    ->required()
                    ->numeric()
                    ->prefix('$'),
                Forms\Components\Select::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'confirmed' => 'Confirmed',
                        'paid' => 'Paid',
                        'cancelled' => 'Cancelled',
                    ])
                    ->required(),
                Forms\Components\TextInput::make('customer_name')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('customer_email')
                    ->email()
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('customer_phone')
                    ->tel()
                    ->maxLength(255),
                Forms\Components\Textarea::make('special_requests')
                    ->maxLength(1000)
                    ->columnSpanFull(),
                Forms\Components\Toggle::make('payment_completed')
                    ->default(false),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('reference')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('user.name')
                    ->searchable(),
                Tables\Columns\TextColumn::make('departure.tour.title')
                    ->searchable(),
                Tables\Columns\TextColumn::make('departure.departure_date')
                    ->date()
                    ->sortable(),
                Tables\Columns\TextColumn::make('customer_name')
                    ->searchable(),
                Tables\Columns\TextColumn::make('customer_email')
                    ->searchable(),
                Tables\Columns\TextColumn::make('total_price')
                    ->money('usd')
                    ->sortable(),
                Tables\Columns\Badge::make('status')
                    ->colors([
                        'warning' => 'pending',
                        'success' => 'confirmed',
                        'success' => 'paid',
                        'danger' => 'cancelled',
                    ]),
                Tables\Columns\IconColumn::make('payment_completed')
                    ->boolean(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'confirmed' => 'Confirmed',
                        'paid' => 'Paid',
                        'cancelled' => 'Cancelled',
                    ]),
                Tables\Filters\TernaryFilter::make('payment_completed'),
            ])
            ->actions([
                Tables\Actions\EditAction::class,
                Tables\Actions\DeleteAction::class,
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::class,
                    Tables\Actions\Action::make('markAsConfirmed')
                        ->requiresConfirmation()
                        ->action(fn ($records) => $records->each->update(['status' => 'confirmed'])),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListBookings::route('/'),
            'create' => Pages\CreateBooking::route('/create'),
            'edit' => Pages\EditBooking::route('/{record}/edit'),
        ];
    }
}
